import express, { json } from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import cors from "cors";
import AuthRoute from "./Routes/AuthRoute.js";
import bodyParser from "body-parser";
import serverless from "serverless-http";

config();
const app = express();
const port = process.env.PORT || 5000;

app.use(json());
app.use(cors());
app.use(bodyParser.raw({ type: "video/webm", limit: "10mb" }));
app.use("/api/auth", AuthRoute);

connect(process.env.MONGO_URL)
  .then(() => console.log("Connected with Database Successfull"))
  .catch((e) => console.log("Database Connection Failed:", e));

app.listen(port, () => console.log("Server is Running on port ", port));
