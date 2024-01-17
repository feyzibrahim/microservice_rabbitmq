require("dotenv").config();
const express = require("express");

const app = express();

app.use(express.json());

app.use("/", (req, res) => {
  res.status(200).json({ message: "Products Success" });
});

app.listen(process.env.PORT, () => {
  console.log("Products is listening on " + process.env.PORT);
});
