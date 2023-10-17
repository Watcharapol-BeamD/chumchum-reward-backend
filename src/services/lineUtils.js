require("dotenv").config();

const line = require("@line/bot-sdk");

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

// create LINE SDK client
// const client = new line.messagingApi.MessagingApiClient({
//   channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
// });

// register a webhook handler with middleware
// about the middleware, please refer to doc
// app.post("/callback", line.middleware(config), (req, res) => {
//   Promise.all(req.body.events.map(handleEvent))
//     .then((result) => res.json(result))
//     .catch((err) => {
//       console.error(err);
//       res.status(500).end();
//     });
// });

const client = new line.Client(config);

module.exports= client
