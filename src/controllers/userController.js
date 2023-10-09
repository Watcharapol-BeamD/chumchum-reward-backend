require("dotenv").config();
const pool = require("../../db");
const queries = require("../queries/queries.js");

const getAllUser = async (req, res) => {
  try {
    const results = await pool.query(queries.getAllUser);
    res.status(200).json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred while fetching users." });
  }
};

const getRegister  =async(req,res)=>{
  const id = req.params.user_id;
  const
}

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

module.exports = {
  getAllUser,
  getUserById,
};
