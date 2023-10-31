require("dotenv").config();
const { db } = require("../../db");
const adminQueries = require("../queries/adminQueries");

const getLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(adminQueries.getLogin, [username, password]);
    const user = result[0][0];
    if (result[0].length > 0) {
      res.status(200).send(user);
    }else{
        res.status(404).send("User not found."); 
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

module.exports = {
  getLogin,
};
