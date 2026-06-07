import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Board } from "../models/board-schema";
import mongoose from "mongoose";

const router = express.Router();

router.put(
  "/api/board/update",
  requireAuth,
  [
    body("board_id")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("board_id must be Provied"),
    body("title")
      .trim()
      .isString()
      .isLength({ min: 4, max: 20 })
      .withMessage("title must be between 4 to 20 chars"),
    body("desc").optional().trim().isString().withMessage("desc must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, desc, board_id } = req.body;
    const board = await Board.findById(board_id);
    if (!board) {
      return res.status(404).send({ message: "Board Not Found." });
    }
    const currentUser = req.currentUser!.id;
    if (board.user_id !== currentUser) {
      return res.status(401).send({ message: "Not Autherized." });
    }
    board.set({
      title,
      desc,
    });
    await board.save();
    res.status(201).send({ message: "success", data: board });
  },
);

export { router as updateBoardRouter };
