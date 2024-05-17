const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user.route");
const authRoute = require("./routes/auth.route");
const postRoute = require('./routes/post.route');
const commentRoute = require('./routes/comment.route');
const cookieParser = require('cookie-parser')
const path = require('path');

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Mongodb connected");
});

const dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());


app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use('/api/post',postRoute);
app.use('/api/comment',commentRoute);

app.use(express.static(path.join(dirname,'/frontend/dist')))
app.get('*',(req,res)=>{
  res.sendFile(path.json(dirname,'frontend','dist','index.html'))
})

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
