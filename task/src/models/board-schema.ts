import mongoose from "mongoose";

interface BoardAttrs {
  title: string;
  desc: string;
  user_id: string;
}

interface BoardDoc extends mongoose.Document {
  id: mongoose.Types.ObjectId;
  title: string;
  desc: string;
  user_id: string;
}

interface BoardModel extends mongoose.Model<BoardDoc> {
  build(attrs: BoardAttrs): BoardDoc;
}

const boardSchema = new mongoose.Schema(
  {
    title: {
      requied: true,
      type: String,
    },
    desc: {
      required: false,
      type: String,
    },
    user_id: {
      required: true,
      type: String,
    },
  },
  {
    toJSON: {
      transform(doc, ret: any) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
    timestamp: true,
    versionKey: false,
  },
);

boardSchema.statics.build = (attrs: BoardAttrs) => {
  return new Board({
    title: attrs.title,
    desc: attrs.desc,
    user_id: attrs.user_id,
  });
};

const Board = mongoose.model<BoardDoc, BoardModel>("Board", boardSchema);

export {Board}