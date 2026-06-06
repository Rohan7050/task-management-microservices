import express from 'express';

const app = express();

app.set("trust proxy", true);

app.use(express.json());

app.get("/test", (req, res) => {
    res.json({ message: "Hello World!" });
})

app.get("/*path", (req, res) => {
    res.json({ message: "error" });
})

export default app;