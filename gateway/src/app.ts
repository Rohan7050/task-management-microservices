import express, { Request, Response, NextFunction } from "express";
import httpProxy from "http-proxy";
import cors from 'cors';

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // only if using cookies
  }),
);
const proxy = httpProxy.createProxyServer({
    changeOrigin: true,
    prependPath: false
});

const authService = "http://tsm-auth:3000";
const taskService = "http://tsm-task:3000";

app.use("/user", (req: Request, res: Response) => {
  console.log(`Incoming request to /api/auth: ${req.method} ${req.url} `);
  proxy.web(req, res, { target: authService }, (err) => {
    console.error(`Error forwarding request to service A: ${err.message} `);
    res.status(500).send("Internal Server Error");
  });
});

app.use("/board", (req: Request, res: Response) => {
  console.log(`Incoming request to /api/task: ${req.method} ${req.url} `);
  proxy.web(req, res, { target: taskService }, (err) => {
    console.error(`Error forwarding request to service A: ${err.message} `);
    res.status(500).send("Internal Server Error");
  });
});

export default app;

