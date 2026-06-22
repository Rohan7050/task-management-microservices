import express from "express";
import cookieSession from "cookie-session";
import { currentUser } from "./middlewares/current-user";
import { deleteBoardRouter } from "./routes/delete-board";
import { updateBoardRouter } from "./routes/update-board";
import { createBoardRouter } from "./routes/create-board";
import { getAllBoardRouter } from "./routes/get-all-boards";
import { getBoardDetailsRouter } from "./routes/get-board-details";
import { createTaskRouter } from "./routes/create-task";
import { updateTaskRouter } from "./routes/update-task";
import { deleteTaskRouter } from "./routes/delete-task";
import cors from 'cors';

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // only if using cookies
  }),
);

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "development",
    keys: ["sssssasa"],
  }),
);

app.use(currentUser);
app.use(createBoardRouter);
app.use(updateBoardRouter);
app.use(deleteBoardRouter);
app.use(getAllBoardRouter);
app.use(getBoardDetailsRouter);
app.use(createTaskRouter);
app.use(updateTaskRouter);
app.use(deleteTaskRouter);

app.get("/test", (req, res) => {
  res.json({ message: "Hello World!", env: process.env.NODE_ENV });
});

app.use("/*path", (req, res) => {
  res.status(404).json({ message: "error" });
});

export default app;
