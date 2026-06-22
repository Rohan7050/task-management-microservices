import express, { Request, Response } from "express";
import { requireAuth } from "../middlewares/require-auth";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import { Board } from "../models/board-schema";

const router = express.Router();

router.get("/api/board", requireAuth, async (req: Request, res: Response) => {
  const userId = req.currentUser!.id;
  const boards = await Board.find({
    user_id: userId,
  });
  res.status(201).send({ message: "success", data: boards });
});

export { router as getAllBoardRouter };
