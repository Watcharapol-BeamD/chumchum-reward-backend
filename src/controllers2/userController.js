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

const getRegister = async (req, res) => {
  const { customer_id, retailer_name, bplus_code, phone_number } = req.body;
  console.log(req.body);

  try {
    // Check if the user already exists in the database
    // const userExistsResult = await db.query(queries.getCheckUserExist, [
    //   customer_id,
    // ]);

    // const existingUserCount = userExistsResult.rows[0].count;
    // if (existingUserCount > 0) {
    //   return res
    //     .status(400)
    //     .json({ msg: "user already register", isRegisterPass: false });
    // }

    // const encryptPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    await db.query(queries.registerNewUser, [
      customer_id,
      retailer_name,
      bplus_code,
      phone_number,
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

const getIsRegister = async (req, res) => {
  const { customer_id } = req.body;
  try {
    // Check if the user already exists in the database
    const userExistsResult = await db.query(queries.getCheckUserExist, [
      customer_id,
    ]);
    const existingUserCount = userExistsResult[0][0].count
 
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

module.exports = {
  getAllUser,
  getRegister,
  getIsRegister,
};
