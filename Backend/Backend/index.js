const express = require("express");
const { json } = require("express");
const { config } = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const AuthRoute = require("./Routes/AuthRoute.js");
const bodyParser = require("body-parser");

config();
const app = express();
const port = process.env.PORT || 5000;

app.use(json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", AuthRoute);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected with Database Successfull"))
  .catch((e) => console.log("Database Connection Failed:", e));

app.listen(port, () => console.log("Server is Running on port ", port));
