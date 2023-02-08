const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 8000;

app.use(cors());
app.use(express.json());

app.get("/yay", (req, res) => {
  console.log("lol");
  return res.send("YAY");
});

app.post("/admin/auth-login", (req, res) => {
  console.log(req.body);
  return res.status(202).send("Success");
});

app.listen(PORT, () => console.log("Server is Running on port ", PORT));
