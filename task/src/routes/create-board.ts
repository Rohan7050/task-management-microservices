import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Board } from "../models/board-schema";

const router = express.Router();

router.post(
  "/api/board/create",
  requireAuth,
  [
    body("title")
      .trim()
      .isString()
      .isLength({ min: 4, max: 20 })
      .withMessage("title must be between 4 to 20 chars"),
    body("desc").optional().trim().isString().withMessage("desc must be valid"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { title, desc } = req.body;
    const userId = req.currentUser!.id;

    const board = Board.build({
      title,
      desc,
      user_id: userId,
    });
    await board.save();
    res.status(201).send({ message: "success", data: board });
  },
);

export { router as createBoardRouter };
