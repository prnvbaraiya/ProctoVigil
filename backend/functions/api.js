const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const app = express();
const authRouter = require("../Routes/AuthRoute");
const mongoose = require("mongoose");
app.use(cors());
app.use(express.json());

mongoose.set("strictQuery", true);
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/", authRouter);

module.exports.handler = serverless(app);
