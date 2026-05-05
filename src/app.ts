import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/router";
import path from "path";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.resolve("uploads")));
app.use(routes);

export default app;