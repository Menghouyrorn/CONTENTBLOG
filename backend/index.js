const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();


mongoose.connect(process.env.MONGO).then(() => {
  console.log("Mongodb connected");
});

const app = express();

app.listen(8000, () => {
  console.log("Server is running on port 3000");
});
