import express, { json } from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import cors from "cors";
import AuthRoute from "./Routes/AuthRoute.js";

config();
const app = express();
app.use(json());
const port = process.env.PORT || 5000;

app.use(cors());
app.use("/api/auth", AuthRoute);

connect(process.env.MONGO_URL)
  .then(() => console.log("Connected with Database Successfull"))
  .catch((e) => console.log("Database Connection Failed"));

app.listen(port, () => console.log("Server is Running on port ", port));
