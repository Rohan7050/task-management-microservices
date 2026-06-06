import mongoose from "mongoose";
import { Password } from "../utils/password.service";

interface UserAttrs {
  email: string;
  password: string;
  username: string;
}

interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  username: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
        transform(doc, ret) {
            delete ret?.password;    
            ret.id = ret._id;
            delete ret?._id;
        }
    },
    timestamps: true,
    versionKey: false,
  },
);

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
