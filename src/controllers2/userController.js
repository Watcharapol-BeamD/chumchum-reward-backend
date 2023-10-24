const { db } = require("../../db");
const queries = require("../queries/queries2");

const { sendEmail } = require("../services/emailService");

const getAllUser = async (req, res) => {
  try {
    const results = await db.query(queries.getAllUser); // Use promise() here
    res.status(200).json(results[0]); // Results is an array; use results[0] to access the data
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred while fetching users." });
  }
};



module.exports = {
  getAllUser,
};
