import mongoose from "mongoose";

export const connectToDB = (cb: Function) => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => cb())
    .catch((error) => console.log("Database Connection Error: ", error));
};
