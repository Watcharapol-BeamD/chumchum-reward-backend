const { db } = require("../../db");
const queries = require("../queries/queries2");

const getAllUser = async (req, res) => {
  try {
    const results = await db.query(queries.getAllUser); // Use promise() here
    res.status(200).json(results[0]); // Results is an array; use results[0] to access the data
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred while fetching users." });
  }
};

const getCustomerById = async (req, res) => {
  const { customer_id } = req.body;

  try {
    const results = await db.query(queries.getCustomerById, [customer_id]);

    res.status(200).json(results[0][0]);
  } catch {
    res.status(500).json({ msg: "An error occurred while fetching users." });
  }
};

const getRegisterNewCustomer = async (req, res) => {
  const { customer_id, retailer_name, bplus_code, phone_number } = req.body;
  console.log(req.body);

  try {
    // Check if the user already exists in the database
    const userExistsResult = await db.query(queries.getCheckUserExist, [
      customer_id,
    ]);

    const existingUserCount = userExistsResult[0][0].count;
    if (existingUserCount > 0) {
      return res
        .status(400)
        .json({ msg: "This user already register", isRegisterPass: false });
    }

    // const encryptPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    await db.query(queries.registerNewCustomer, [
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
    const existingUserCount = userExistsResult[0][0].count;

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

const updateCustomerInformation = async (req, res) => {
  const { province, district, sub_district, post_code, address, customer_id } =
    req.body;
  try {
    const userExistsResult = await db.query(queries.getCheckUserExist, [
      customer_id,
    ]);
    const existingUserCount = userExistsResult[0][0].count;
    if (existingUserCount > 0) {
      await db.query(queries.updateCustomerInfo, [
        province,
        district,
        sub_district,
        post_code,
        address,
        customer_id,
      ]);
      res.status(200).json({ msg: "Update customer information successful.",isFinish:true });
    } else {
      res.status(404).json({ msg: "User not found." ,isFinish:false});
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

module.exports = {
  getAllUser,
  getRegisterNewCustomer,
  getIsRegister,
  getCustomerById,
  updateCustomerInformation,
};
