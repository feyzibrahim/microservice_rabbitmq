require("dotenv").config();
import { Request, Response, Application } from "express";

import express from "express";

const app: Application = express();

app.use(express.json());

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Customer Success" });
});

app.listen(process.env.PORT, () => {
  console.log("Customer is listening on " + process.env.PORT);
});
