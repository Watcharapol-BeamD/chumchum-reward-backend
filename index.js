const express = require("express"); //
const app = express();
const port = 5000;
const cors = require("cors");
const userRouter = require("./src/routers/userRouter");
const rewardRouter = require("./src/routers/rewardRouter")
const adminRouter = require('./src/routers/adminRouter')

// const { config } = require("dotenv");
require("dotenv").config();
const line = require("@line/bot-sdk");
app.use(cors({}));

//middleware
app.use(express.json()); //body parser ทำให้เห็น Json ตอน post
app.use(express.urlencoded({ extended: false })); //อาจจะไม่ต้องใส่
// app.use(router)

//{ origin: 'http://localhost:3000' }

app.use("/api/v1/user", userRouter);
app.use("/api/v1/reward",rewardRouter);
app.use("/api/v1/admin",adminRouter);

//--------------Line set up-----------------
 
const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
