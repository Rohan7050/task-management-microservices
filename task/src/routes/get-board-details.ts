import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Board } from "../models/board-schema";
import mongoose from "mongoose";
import { Task } from "../models/task-schema";

const router = express.Router();

router.get(
  "/api/board/:boardId",
  requireAuth,
  async (req: Request, res: Response) => {
    const { boardId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(boardId as string)) {
      return res.status(400).send({ message: "Invalid Board Id" });
    }
    const board = await Board.findById(boardId).lean();
    if (!board) {
      return res.status(404).send({ message: "Board Not Found." });
    }
    const currentUser = req.currentUser!.id;
    if (board.user_id !== currentUser) {
      return res.status(401).send({ message: "Not Autherized." });
    }
    const tasks = await Task.find({
        board_id: board._id,
    }).lean();
    res.status(200).send({ message: "success", data: { ...board, tasks } });
  },
);

export { router as getBoardDetailsRouter };
