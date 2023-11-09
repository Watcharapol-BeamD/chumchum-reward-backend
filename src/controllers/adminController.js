require("dotenv").config();
const { db } = require("../../db");
const adminQueries = require("../queries/adminQueries");

const {
  jwtAccessTokenGenerate,
  jwtRefreshTokenGenerate,
} = require("../services/jwtUtils");

const GetResetAdminPassword = async (req, res) => {
  const { password, adminId } = req.body;

  try {
    db.query(adminQueries.resetPassword, [password, adminId]);
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
        is_first_login: user.is_first_login,
      };

      //***jwt use for admin only*/
      const access_token = jwtAccessTokenGenerate(userData);
      const refresh_token = jwtRefreshTokenGenerate(userData);
      res.status(200).json({
        msg: "Login complete",
        is_login_pass: true,
        access_token: access_token,
        refresh_token: refresh_token,
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
  GetResetAdminPassword,
};
