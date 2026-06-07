import mongoose from "mongoose";

interface TaskAttrs {
  title: string;
  desc: string;
  start_date: Date;
  end_date: Date;
  board_id: mongoose.Types.ObjectId;
}

interface TaskDoc extends mongoose.Document {
  id: string;
  title: string;
  desc: string;
  start_date: Date;
  end_date: Date;
  board_id: mongoose.Types.ObjectId;
}

interface TaskModel extends mongoose.Model<TaskDoc> {
  build(attrs: TaskAttrs): TaskDoc;
}

const taskSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    desc: {
      required: false,
      type: String,
    },
    start_date: {
      required: false,
      type: Date,
      default: Date.now,
    },
    end_date: {
      required: false,
      type: Date,
    },
    board_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
      required: true,
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

taskSchema.statics.build = (attrs: TaskAttrs) => {
  return new Task(attrs);
};

const Task = mongoose.model<TaskDoc, TaskModel>("Task", taskSchema);

export { Task };