require("dotenv").config();
const pool = require("../../db");
const queries = require("../queries/queries.js");
const client = require("../services/lineUtils");
const getAllUser = async (req, res) => {
  try {
    const results = await pool.query(queries.getAllUser);
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred while fetching users." });
  }
};

const getRegister = async (req, res) => {
  const { user_id, retailer_name, bplus_code, mobile_number } = req.body;
  console.log(req.body);

  try {
    // Check if the user already exists in the database
    const userExistsResult = await pool.query(queries.getCheckUserExist, [
      user_id,
    ]);

    const existingUserCount = userExistsResult.rows[0].count;
    if (existingUserCount > 0) {
      return res
        .status(400)
        .json({ msg: "user already register", isRegisterPass: false });
    }

    // const encryptPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    await pool.query(queries.registerNewUser, [
      user_id,
      retailer_name,
      bplus_code,
      mobile_number,
    ]);

    res
      .status(201)
      .json({ msg: "Registration successful", isRegisterPass: true });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ msg: "An error occurred while registering the user" });
  }
};

const getUserById = async (req, res) => {
  const id = req.body.id;

  try {
    const results = await pool.query(queries.getUserById, [id]);

    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred while fetching users." });
  }
};

const getIsRegister = async (req, res) => {
  const { user_id } = req.body;
  try {
    // Check if the user already exists in the database
    const userExistsResult = await pool.query(queries.getCheckUserExist, [
      user_id,
    ]);
    const existingUserCount = userExistsResult.rows[0].count;
    if (existingUserCount > 0) {
      res.status(200).json({ isRegister: true });
    } else {
      res.status(200).json({ isRegister: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

const getRedeemReward = async (req, res) => {
  const { user_id, reward_name, quantity, timestamp } = req.body;
  console.log(req.body);
  try {
    // Check if the user already exists in the database
    const userExistsResult = await pool.query(queries.getCheckUserExist, [
      user_id,
    ]);
    const existingUserCount = userExistsResult.rows[0].count;
    if (existingUserCount > 0) {
      // Insert the redeem reward into the database.
      await pool.query(queries.keepRewardToHistory, [
        user_id,
        reward_name,
        quantity,
        timestamp,
      ]);
      client.pushMessage(user_id,[
        {
            "type": "text",
            "text": "ขอบคุณที่แลกของ"
        }
   
    ])
      res.status(201).json({ msg: "redeem successful" });
      
    } else {
      res.status(404).json({ msg: "Redemption Failed: User Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

module.exports = {
  getAllUser,
  getUserById,
  getRegister,
  getIsRegister,
  getRedeemReward,
};
