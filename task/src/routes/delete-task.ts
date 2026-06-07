import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Board } from "../models/board-schema";
import mongoose from "mongoose";
import { Task } from "../models/task-schema";

const router = express.Router();

router.delete(
  "/api/task/delete",
  requireAuth,
  [
    body("board_id")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("board_id must be Provied"),
    body("task_id")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("board_id must be Provied"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { board_id, task_id } = req.body;
    const board = await Board.findById(board_id);
    if (!board) {
      return res.status(404).send({ message: "Board Not Found." });
    }
    const currentUser = req.currentUser!.id;
    if (board.user_id !== currentUser) {
      return res.status(401).send({ message: "Not Autherized." });
    }
    const task = await Board.findOne({
        $where: {
            id: task_id,
            board_id
        }
    });
    if (!task) {
      return res.status(404).send({ message: "task Not Found." });
    }
    await Task.deleteOne({id: task_id});
    res.status(200).send({ message: "successly delete" });
  },
);

export { router as deleteTaskRouter };
