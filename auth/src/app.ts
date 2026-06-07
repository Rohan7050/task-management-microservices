import express from 'express';
import cookieSession from "cookie-session";

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
    keys: ["sssssasa"],
  })
);

app.get("/test", (req, res) => {
    res.json({ message: "Hello World!" });
})

app.get("/*path", (req, res) => {
    res.json({ message: "error" });
})

export default app;