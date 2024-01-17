import dotenv from "dotenv";
import { Request, Response, Application } from "express";
import express from "express";
import { connectToDB } from "./db/db";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Shopping Success" });
});

connectToDB(() => {
  app.listen(process.env.PORT, () => {
    console.log("Shopping is listening on " + process.env.PORT);
  });
});
