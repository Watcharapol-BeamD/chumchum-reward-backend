require("dotenv").config();
const nodemailer = require("nodemailer");
const {db} = require("../../db");
const queries = require("../queries/queries.js");
const client = require("../services/lineUtils");
const template = require("./../lineMessageTemplates/template");

//-------------Reward Controller--------------------------

const getRedeemReward = async (req, res) => {
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
  console.log("wrong")
};

module.exports = {
  getRedeemReward,
  getSendEmail,
};
