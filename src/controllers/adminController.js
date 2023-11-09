require("dotenv").config();
const { db } = require("../../db");
const adminQueries = require("../queries/adminQueries");

const {
  jwtAccessTokenGenerate,
  jwtRefreshTokenGenerate,
} = require("../services/jwtUtils");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getResetAdminPassword = async (req, res) => {
  const { newPassword, current_password, admin_id } = req.body;
  // console.log(req.body);
  try {
    const result = await db.query(adminQueries.getAdminDetails, [admin_id]);
    const user = result[0][0];

    //if password not match will reject
    if (user.password !== current_password) {
      return res.status(401).send({
        resetPasswordMsg: "Invalid Credentials",
        is_reset_finish: false,
        is_first_login: 1,
      });
    }
    //-----Hash password---------
    const encryptPassword = await bcrypt.hash(newPassword, saltRounds);

    //--------------------------

    //update new password
    await db.query(adminQueries.resetPassword, [encryptPassword, admin_id]);
    res.status(200).send({
      resetPasswordMsg: "Reset password success.",
      is_reset_finish: true,
      is_first_login: 0,
    });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({
        resetPasswordMsg: "An error occurred while processing your request.",
        is_first_login: 1,
      });
  }
};

const getLogin = async (req, res) => {
  const { username, password, phoneNumber } = req.body;

  try {
    const result = await db.query(adminQueries.getLogin, [
      username,
      phoneNumber,
    ]);
    const user = result[0][0];

    if (result[0].length > 0) {
      const userData = {
        admin_id: user.admin_id,
      };

      //--------------If first login -------------
      if (user.is_first_login) {
        if (password === user.password) {
          const access_token = jwtAccessTokenGenerate(userData);
          const refresh_token = jwtRefreshTokenGenerate(userData);
          console.log("passs");
          return res.status(200).json({
            msg: "Login complete",
            is_login_pass: true,
            access_token: access_token,
            refresh_token: refresh_token,
            is_first_login: user.is_first_login,
          });
        } else {
          return res.status(401).json({
            msg: "Invalid credential",
            is_login_pass: false,
            is_first_login: user.is_first_login,
          });
        }
        //------------------------------------------
      } else {
        //-------------if normal login----------------------------------------------------------
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          //***jwt use for admin only*/ if add more information in token modify in function too.
          const access_token = jwtAccessTokenGenerate(userData);
          const refresh_token = jwtRefreshTokenGenerate(userData);
          return res.status(200).json({
            msg: "Login complete",
            is_login_pass: true,
            access_token: access_token,
            refresh_token: refresh_token,
            is_first_login: user.is_first_login,
          });
          //---------------------------------------------------------------------------------------
        } else {
          return res.status(401).json({
            msg: "Invalid credential",
            is_login_pass: false,
            is_first_login: user.is_first_login,
          });
        }
      }
    } else {
      return res
        .status(401)
        .send({ msg: "Invalid credentials.", is_login_pass: false });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      msg: "An error occurred while processing your request.",
      is_login_pass: false,
    });
  }
};

const getCustomerInfo = async (req, res) => {
  try {
    const results = await db.query(adminQueries.getCustomerInfoList);

    const customerList = results[0];
    res.status(200).json(customerList);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

module.exports = {
  getLogin,
  getCustomerInfo,
  getResetAdminPassword,
};
