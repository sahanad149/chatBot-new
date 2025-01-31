import express from "express";
import { config } from "dotenv";
import { morgan } from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

config();

// 'app' variable holds the functionality of the express application
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(morgan("Dev"));     // To be removed during production. Only for development.

app.use("/api/v1", appRouter);

export default app;