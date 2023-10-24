require("dotenv").config();
const nodemailer = require("nodemailer");
const { db } = require("../../db");
const queries = require("../queries/queries2.js");
const client = require("../services/lineUtils");
const template = require("./../lineMessageTemplates/template");
const { sendEmail } = require("../services/emailService");

//-------------Reward Controller--------------------------

const getRedeemReward = async (req, res) => {
  console.log("5555555555")
  const {
    customer_id,
    reward_id,
    quantity,
    points_used,
    reward_name,//ใช้แค่ตอนส่ง mail
    bplus_code,//ใช้แค่ตอนส่ง mail
    retailer_name,//ใช้แค่ตอนส่ง mail
  } = req.body;

  // console.log(req.body);
  try {
    // Check if the user already exists in the database
    const userExistsResult = await db.query(queries.getCheckUserExist, [
      customer_id,
    ]);

    const existingUserCount = userExistsResult[0][0].count;

    if (existingUserCount > 0) {
      // Insert the redeem reward into the database.
      await db.query(queries.keepRewardToHistory, [
        customer_id,
        reward_id,
        quantity,
        points_used,
      ]);

      //------------get retailer name by customer_id-----------------

      // get timestamp from database before send email
      const redeem_timestamp_result = await db.query(
        queries.getRedeemRewardTimestamp
      );
      const redeem_timestamp = redeem_timestamp_result[0][0].redeem_timestamp;

      // await sendEmail(retailer_name, bplus_code, reward_name, redeem_timestamp);

      //push line message
      //customer_id ต้องเป็นของ line
      // client.pushMessage(customer_id, [
      //  template.replyRedeemRewardV2,
      //   {
      //       "type": "text",
      //       "text": "ขอบคุณที่แลกของลางวัล"
      //   }
      // ]);

      res.status(201).json({ msg: "redeem successful" });
    } else {
      res.status(404).json({ msg: "Redemption Failed: User Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

const getRemainReward = async (req, res) => {
  const { reward_id } = req.query;

  try {
    const checkHasReward = await db.query(queries.getRewardRemainQuantity, [
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
  console.log("wrong");
};

module.exports = {
  getRedeemReward,
  getSendEmail,
  getRemainReward,
};
