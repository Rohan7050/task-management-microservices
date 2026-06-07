import express from 'express';
import cookieSession from "cookie-session";

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

app.get("/test", (req, res) => {
    res.json({ message: "Hello World!", env: process.env.NODE_ENV  });
})

app.use("/*path", (req, res) => {
    res.status(404).json({ message: "error" });
})

export default app;