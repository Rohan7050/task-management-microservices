import express from 'express';
import cookieSession from "cookie-session";
import {registerUserRouter} from "./routes/register-user";
import {loginUserRouter} from "./routes/login-user";
import { logoutUserRouter } from './routes/logout-user';
import { currentUserRouter } from './routes/current-user';

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "development",
    keys: ["sssssasa"],
  })
);

app.use(registerUserRouter);
app.use(loginUserRouter);
app.use(logoutUserRouter);
app.use(currentUserRouter);

app.get("/test", (req, res) => {
    res.json({ message: "Hello World!", env: process.env.NODE_ENV  });
})

app.use("/*path", (req, res) => {
    res.status(404).json({ message: "error" });
})

export default app;