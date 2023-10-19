require("dotenv").config();
const nodemailer = require("nodemailer");
const pool = require("../../db");
const queries = require("../queries/queries.js");
const client = require("../services/lineUtils");
const template = require("./../lineMessageTemplates/template");

//-------------Reward Controller--------------------------

const getRedeemReward = async (req, res) => {
  const { reward_id } = req.query;

  try {
    const checkHasReward = await pool.query(queries.getRewardRemainQuantity, [
      reward_id,
    ]);

    res.json(checkHasReward.rows[0].reward_id);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .send("An error occurred while processing your request." + err);
  }
};

const getSendEmail = async (req, res) => {
  //------------------EMAIL--------------------------------
 
  const transporter = nodemailer.createTransport({
    host: "gmail",
    service:'gmail',
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "chumchumth@gmail.com",
      pass: "mnwh cvnx sreg huxa",
    },
  });

  // send mail with defined transport object
  const message = {
    from: '"BewBew 👻" ', // sender address
    to: "chumchumth@gmail.com", // list of receivers
    subject: "แลกของรางวัล(--รหัสร้านค้า-ชื่อ)", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>ชื่อ รหัสร้านค้า ของรางวัลอะไร เวลาที่แลก</b>", // html body
  };

  transporter
    .sendMail(message)
    .then(() => {
      console.log("test");
      res.status(201).json({ msg: "Message was send." });
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging
      res.status(500).json({ error: "Email sending failed" + err });
    });

  //------------------------------------------------------
};

module.exports = {
  getRedeemReward,
  getSendEmail,
};
