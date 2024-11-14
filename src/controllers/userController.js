const { db } = require("../../db");
const queries = require("../queries/queries");
const customerQueries = require("../queries/CustomerQueries");
const adminQueries = require("../queries/adminQueries");

const {
  jwtAccessTokenGenerate,
  jwtRefreshTokenGenerate,
} = require("../services/jwtUtils");

const getAllUser = async (req, res) => {
  try {
    const results = await db.query(customerQueries.getAllUser); // Use promise() here
    res.status(200).json(results[0]); // Results is an array; use results[0] to access the data
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "An error occurred while fetching users." });
  }
};

const getCustomerById = async (req, res) => {
  const { customer_id } = req.body;

  try {
    const results = await db.query(customerQueries.getCustomerById, [customer_id]);

    res.status(200).json(results[0][0]);
  } catch {
    res.status(500).json({ msg: "An error occurred while fetching users." });
  }
};

const getCustomerInfo = async (req, res) => {
  // console.log("test")
  try {
    const results = await db.query(customerQueries.getCustomerInfoList);

    const customerList = results[0];
    res.status(200).json(customerList);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

const getRegisterNewCustomer = async (req, res) => {
  const { customer_id, retailer_name, bplus_code, phone_number } = req.body;
  // console.log(req.body);

  try {
    // Check if the user already exists in the database
    const userExistsResult = await db.query(customerQueries.getCheckUserExist, [
      customer_id,
    ]);

    const existingUserCount = userExistsResult[0][0].count;
    if (existingUserCount > 0) {
      return res
        .status(400)
        .json({ msg: "This user already register", isRegisterPass: false });
    }

    //check has retailer code
    const hasRetailerCodeResult = await db.query(customerQueries.getCheckRetailerCode, [
      bplus_code,
    ]);

    if (!hasRetailerCodeResult[0].length) {
      return res
        .status(404)
        .json({ msg: "ไม่พบรหัสร้านค้าของคุณ", isRegisterPass: false });
    } else if (hasRetailerCodeResult[0][0].activation === 1) {
      return res
        .status(403)
        .json({ msg: "รหัสร้านค้านี้ถูกลงทะเบียนแล้ว", isRegisterPass: false });
    }

    if (hasRetailerCodeResult[0][0].activation === 0) {
      await db.query(customerQueries.getActivateCustomer, [bplus_code]);
    }
    // Insert the new user into the database
    const defaultCustomerGroup = 1;
    const defaultPoints = 0;

    await db.query(customerQueries.registerNewCustomer, [
      customer_id,
      retailer_name,
      bplus_code,
      phone_number,
      defaultPoints,
      defaultCustomerGroup,
    ]);

    res.status(201).json({
      msg: "Registration successful",
      isRegisterPass: true,
    });
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
    // Check if the user already exists in the database.
    const userExistsResult = await db.query(customerQueries.getCheckUserExist, [
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
    const userExistsResult = await db.query(customerQueries.getCheckUserExist, [
      customer_id,
    ]);
    const existingUserCount = userExistsResult[0][0].count;
    if (existingUserCount > 0) {
      await db.query(customerQueries.updateCustomerInfo, [
        province,
        district,
        sub_district,
        post_code,
        address,
        customer_id,
      ]);
      res.status(200).json({
        msg: "Update customer information successful.",
        isFinish: true,
      });
    } else {
      res.status(404).json({ msg: "User not found.", isFinish: false });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

const getRefreshToken = async (req, res) => {
  //receive data from middleware
  const customer_id = req.customer_id;
  const old_refresh_token = req.token;
  try {
    const results = await db.query(customerQueries.getRefreshToken, [customer_id]);
    if (results[0].length === 1) {
      // Check is old refresh token if yes will reject.
      if (old_refresh_token !== results[0][0].refresh_token) {
        return res.sendStatus(401);
      }
      const user = { customer_id };
      const access_token = jwtAccessTokenGenerate(user);
      const refresh_token = jwtRefreshTokenGenerate(user);

      await db.query(customerQueries.getUpdateRefreshToken, [
        refresh_token,
        customer_id,
      ]);

      res.status(200).send({
        access_token: access_token,
        refresh_token: refresh_token,
        msg: "token refresh complete",
      });
    } else {
      res.status(401).send({ msg: "Invalid credentials" });
    }
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ msg: "An error occurred while processing your request." });
  }
};

const getCustomerGroup = async (req, res) => {
  try {
    const result = await db.query(customerQueries.getCustomerGroup);
    res.status(200).send(result[0]);
  } catch (error) {
    console.log(error);
    res
      .status(404)
      .send({ msg: "An error occurred while processing your request." });
  }
};

const getCustomerByPhoneNumber = async (req, res) => {
  const { phone_number } = req.body;

  try {
    const result = await db.query(customerQueries.getCustomerByPhoneNumber, [
      phone_number,
    ]);

    if (result[0].length === 0) {
      return res
        .status(200)
        .send({ customer: result[0][0], msg: "user not found" });
    }
    res.status(200).send({ customer: result[0][0], msg: "user found" });
  } catch {
    res
      .status(404)
      .send({ msg: "An error occurred while processing your request." });
  }
};

const addRetailerCodeInfo = async (req, res) => {
  const { bplus_code, retailer_name } = req.body;

  const isActivate = 0; // activation
  try {
    const [[IsRetailerCodeExist]] = await db.query(
      customerQueries.getCheckIsBplusCodeExist,
      [bplus_code]
    );

    if (IsRetailerCodeExist.count > 0) {
      return res
        .status(400)
        .json({ msg: "This outlet code already exist.", isFinish: false });
    }

    await db.query(customerQueries.addNewRetailerCodeInfo, [
      bplus_code,
      retailer_name,
      isActivate,
    ]);

    res
      .status(200)
      .send({ msg: `Insert ${bplus_code} completed`, isFinish: true });
  } catch {
    res.status(404).send({
      msg: "An error occurred while processing your request.",
      isFinish: false,
    });
  }
};

const getEditRetailerName = async (req, res) => {
  const { bplus_code, retailer_name } = req.body;

  try {
    await db.query(customerQueries.getEditRetailerInfo, [
      retailer_name,
      bplus_code,
    ]);

    res.status(200).send({ msg: `Update complete`, isFinish: true });
  } catch {
    res
      .status(404)
      .send({
        msg: "An error occurred while processing your request.",
        isFinish: false,
      });
  }
};

const getRetailerCodeInfo = async (req, res) => {
  try {
    const [results] = await db.query(customerQueries.getRetailerCodeInfo);
    res.status(200).send(results);
  } catch {
    res
      .status(404)
      .send({ msg: "An error occurred while processing your request." });
  }
};

const getRetailerCodeInfoByBPlusCode = async (req, res) => {
  const { bplus_code } = req.body;

  try {
    const [[results]] = await db.query(
      customerQueries.getRetailerCodeInfoByBPlusCode,
      [bplus_code]
    );

    if (results) {
      res.status(200).send(results);
    } else {
      res.status(404).send({ msg: "Not Found" });
    }
  } catch {
    res
      .status(404)
      .send({ msg: "An error occurred while processing your request." });
  }
};

module.exports = {
  getAllUser,
  getRegisterNewCustomer,
  getIsRegister,
  getCustomerById,
  updateCustomerInformation,
  getRefreshToken,
  getCustomerGroup,
  getCustomerInfo,
  getCustomerByPhoneNumber,
  addRetailerCodeInfo,
  getEditRetailerName,
  getRetailerCodeInfo,
  getRetailerCodeInfoByBPlusCode,
};
