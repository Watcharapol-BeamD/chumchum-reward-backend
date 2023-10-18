const express = require("express"); //
const app = express();
const port = 5000;
const cors = require("cors");
const userRouter = require("./src/routers/userRouter");
 const rewardRouter = require("./src/routers/rewardRouter")
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
//--------------Line set up-----------------
 

const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

// create LINE SDK client
// const client = new line.messagingApi.MessagingApiClient({
//   channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
// });

// const client = new line.Client(lineConfig);

// client.pushMessage("U1a12937aef17947c281f9d3e7cf857b7", [
//   { type: "text", text: "สวัสดีจร้าาาา5556" },
// ]);

// app.post("/webhook", line.middleware(lineConfig), (req, res) => {
//   res.end();
//   // res.status(200).send("54444")

//   Promise.all([req.body.events.map(handleEvents)])
//   .then((result) =>  res.json(result)  );

// });

//-------------------------------

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
