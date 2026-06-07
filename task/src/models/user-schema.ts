import mongoose from "mongoose";

interface UserAttrs {
  id: string;
  email: string;
  username: string;
}

interface UserDoc extends mongoose.Document {
  id: string;
  email: string;
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
    username: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret?._id;
      },
    },
    timestamps: true,
    versionKey: false,
  },
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User({
    _id: attrs.id,
    username: attrs.username,
    email: attrs.email,
  });
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
