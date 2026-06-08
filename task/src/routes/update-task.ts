import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Board } from "../models/board-schema";
import mongoose from "mongoose";
import { Task } from "../models/task-schema";

const router = express.Router();

router.put(
  "/api/task/update",
  requireAuth,
  [
    body("title")
      .trim()
      .isString()
      .isLength({ min: 4, max: 20 })
      .withMessage("title must be between 4 to 20 chars"),
    body("desc").optional().trim().isString().withMessage("desc must be valid"),
    body("start_date")
      .isISO8601()
      .withMessage("Invalid date")
      .custom((value) => {
        if (new Date(value) <= new Date()) {
          throw new Error("Date must be in the future");
        }
        return true;
      }),
    body("end_date")
      .optional()
      .isISO8601()
      .withMessage("Invalid date")
      .custom((value) => {
        if (new Date(value) <= new Date()) {
          throw new Error("Date must be in the future");
        }
        return true;
      }),
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
    const { title, desc, start_date, end_date, board_id, task_id } = req.body;
    const board = await Board.findById(board_id);
    if (!board) {
      return res.status(404).send({ message: "Board Not Found." });
    }
    const currentUser = req.currentUser!.id;
    if (board.user_id !== currentUser) {
      return res.status(401).send({ message: "Not Autherized." });
    }
    const task = await Task.findOne({
      _id: task_id,
      board_id: board_id,
    });
    if (!task) {
      return res.status(404).send({ message: "task Not Found." });
    }
    task.set({
      title,
      desc,
      start_date,
      end_date,
    });
    await task.save();
    res.status(200).send({ message: "success", data: task });
  },
);

export { router as updateTaskRouter };
