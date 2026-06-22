import express from "express";
import cookieSession from "cookie-session";
import { registerUserRouter } from "./routes/register-user";
import { loginUserRouter } from "./routes/login-user";
import { logoutUserRouter } from "./routes/logout-user";
import { currentUserRouter } from "./routes/current-user";
import cors from "cors";

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

app.use(registerUserRouter);
app.use(loginUserRouter);
app.use(logoutUserRouter);
app.use(currentUserRouter);

app.get("/api/user/test", (req, res) => {
  res.json({ message: "Hello World!", env: process.env.NODE_ENV });
});

app.use("/*path", (req, res) => {
  res.status(404).json({ message: "error" });
});

export default app;
