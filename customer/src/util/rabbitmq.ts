import amqplib, { Channel } from "amqplib";

export const createChannel = async () => {
  try {
    const connection = await amqplib.connect(process.env.MESSAGE_BROKER_URL);
    const channel = await connection.createChannel();
    await channel.assertExchange(process.env.EXCHANGE_NAME, "direct");

    return channel;
  } catch (error) {
    console.log("Create Channel Error: ", error);
  }
};

export const sendData = async (data: {}, channel: Channel) => {
  channel.sendToQueue("test-queue", Buffer.from(JSON.stringify(data)));

  await channel.close();
};

export const publishMessage = (
  channel: Channel,
  binding_key: string,
  message: Buffer
) => {
  try {
    channel.publish(
      process.env.EXCHANGE_NAME,
      binding_key,
      Buffer.from(message)
    );
  } catch (error) {
    console.log("Publish Message Error: ", error);
  }
};

export const subscribeMessage = async (
  channel: Channel,
  service: any,
  binding_key: string
) => {
  const appQueue = await channel.assertQueue("QUEUE_NAME");

  channel.bindQueue(appQueue.queue, process.env.EXCHANGE_NAME, binding_key);

  channel.consume(appQueue.queue, (data: any) => {
    console.log("Data Received:");
    console.log(data.content.toString);
  });
};
