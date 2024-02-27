require("dotenv/config");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/hospital-app")
  .then(() => {
    console.log("connect mongodb");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send("api woeking");
});
app.use("/api/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port :${PORT}`);
});
