require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).json({ message: "Shopping Success" });
});

app.listen(process.env.PORT, () => {
  console.log("Shopping is listening on " + process.env.PORT);
});
