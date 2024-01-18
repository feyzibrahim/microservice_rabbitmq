import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
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
  } catch (error) {
    console.log("connect queue: ", error);
  }
};

connectQueue();

const sendData = async (data: {}) => {
  try {
    const newChannel = await connection.createChannel();
    await newChannel.assertQueue("test-queue");

    newChannel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)));

    await newChannel.close();
  } catch (error) {
    console.log("sendData: ", error);
  }
};

app.get("/", (req: Request, res: Response) => {
  const { data } = req.body;

  sendData({ data });
  res.json({ data });
});

connectToDB(() => {
  app.listen(process.env.PORT, () => {
    console.log("Customer is listening on " + process.env.PORT);
  });
});
