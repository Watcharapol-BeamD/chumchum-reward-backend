require("dotenv").config();
const { db } = require("../../db");
const adminQueries = require("../queries/adminQueries");

const {
  jwtAccessTokenGenerate,
  jwtRefreshTokenGenerate,
} = require("../services/jwtUtils");

const getResetAdminPassword = async (req, res) => {
  const { newPassword, current_password, admin_id } = req.body;
  console.log(req.body);
  try {
    
    db.query(adminQueries.resetPassword, [newPassword, admin_id,current_password]);
    res.status(200).send("Reset password success.");
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while processing your request.");
  }
};

const getLogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await db.query(adminQueries.getLogin, [username, password]);

    const user = result[0][0];
    if (result[0].length > 0) {
      // const passwordMatch = await bcrypt.compare(password, user.password);

      const userData = {
        admin_id: user.admin_id,
      };

      //***jwt use for admin only*/ if add more information in token modify in function too.
      const access_token = jwtAccessTokenGenerate(userData);
      const refresh_token = jwtRefreshTokenGenerate(userData);
      res.status(200).json({
        msg: "Login complete",
        is_login_pass: true,
        access_token: access_token,
        refresh_token: refresh_token,
        is_first_login: user.is_first_login,
      });
    } else {
      res.status(401).send("Invalid credentials.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("An error occurred while processing your request.");
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
