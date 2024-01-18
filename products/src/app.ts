import dotenv from "dotenv";
import { Request, Response, Application } from "express";
import express from "express";
import { connectToDB } from "./db/db.js";
import amqp, { Channel, Connection } from "amqplib";

dotenv.config();

const app: Application = express();

app.use(express.json());

let channel: Channel, connection: Connection;

const connectQueue = async () => {
  try {
    connection = await amqp.connect("amqp://localhost:5672");
    channel = await connection.createChannel();

    await channel.assertQueue("test-queue");

    channel.consume("test-queue", (data) => {
      console.log(Buffer.from(data.content).toString());
      channel.ack(data);
    });
  } catch (error) {
    console.log("connect queue: ", error);
  }
};

connectQueue();

app.use("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Products Success" });
});

connectToDB(() => {
  app.listen(process.env.PORT, () => {
    console.log("Products is listening on " + process.env.PORT);
  });
});
