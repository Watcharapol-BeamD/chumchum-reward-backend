require("dotenv").config();
const { db } = require("../../db");
const adminQueries = require("../queries/adminQueries");
const queries = require("../queries/queries.js");

const {
  jwtAccessTokenGenerate,
  jwtRefreshTokenGenerate,
} = require("../services/jwtUtils");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const addNewSaleHistory = async (req, res) => {
  const saleHistoryList = req.body;

  // const addSaleHistory = `INSERT INTO Points_Transactions (doc_date, doc_ref, bill_amount, point_amount, fk_customer_id) VALUES (?, ?, ?, ?, ?);`;
  // const getCustomerCode = "SELECT customer_id FROM Customers WHERE bplus_code = ?";
  // const increasePoint = "UPDATE Customers SET points = points + ? WHERE customer_id = ?;";

  try {
    for (const item of saleHistoryList) {
      const [customerResults] = await db.query(adminQueries.getCustomerCode, [
        item.VxceedCode,
      ]);

      if (customerResults.length > 0) {
        const customerId = customerResults[0].customer_id;
 
        //when item.BillAmount less than 0 ,it mean customer return product but use same query to decrease point.
        const pointAmount = item.BillAmount > 0 ? Math.floor(item.BillAmount / 100) : Math.ceil(item.BillAmount / 100);

        await db.query(adminQueries.addSaleHistory, [
          item.DocDate,
          item.DocRef,
          item.BillAmount,
          pointAmount,
          customerId,
        ]);
        await db.query(queries.increasePoint, [pointAmount, customerId]);
      }
    }

    res.status(200).send("Sale history added successfully.");
  } catch (error) {
    // console.error("Error adding sale history:", error);
    if (error.code === "ER_TRUNCATED_WRONG_VALUE") {
      return res
        .status(500)
        .send({ isUploadCSVError: true, csvMsg: "Wrong format" });
    }
    res
      .status(500)
      .send({ isUploadCSVError: true, csvMsg: "Internal Server Error" });
  }
};

// ใช้ได้เหมือนกัน
// const addNewSaleHistory = async (req, res) => {
//   const saleHistoryList = req.body;
//   const addSaleHistory = `INSERT INTO Points_Transactions (doc_date, doc_ref, bill_amount,point_amount,fk_customer_id)VALUES (?,?,?,?,?);`;
//   const getCustomerCode =
//     "SELECT customer_id FROM Customers WHERE bplus_code = ?";
//   const updatePoint =
//     "UPDATE Customers SET points = points + ? WHERE customer_id = ?;";

//   saleHistoryList.map(async (item) => {
//     await db.query(getCustomerCode, [item.VxceedCode]).then((res) => {
//       const customerIdList = res[0];

//       customerIdList.map(async (item2) => {
//         const pointAmount = Math.floor(item.BillAmount / 500);
//         const customerId = item2.customer_id;

//         await db.query(addSaleHistory, [
//           item.DocDate,
//           item.DocRef,
//           item.BillAmount,
//           pointAmount,
//           customerId,
//         ]);

//         await db.query(updatePoint, [pointAmount, customerId]);
//       });
//     });
//   });
// };

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
    res.status(500).send({
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

          await db.query(adminQueries.addRefreshToken, [
            refresh_token,
            user.admin_id,
          ]);

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
          await db.query(adminQueries.addRefreshToken, [
            refresh_token,
            user.admin_id,
          ]);

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

const getRefreshToken = async (req, res) => {
  //receive data from middleware
  const admin_id = req.admin_id;
  const old_refresh_token = req.token;

  try {
    const results = await db.query(adminQueries.getRefreshToken, [admin_id]);
    if (results[0].length === 1) {
      // Check is old refresh token if yes will reject.
      if (old_refresh_token !== results[0][0].refresh_token) {
        return res.sendStatus(401);
      }
      const user = { admin_id };
      const access_token = jwtAccessTokenGenerate(user);
      const refresh_token = jwtRefreshTokenGenerate(user);

      await db.query(adminQueries.addRefreshToken, [refresh_token, admin_id]);

      res.status(200).send({
        access_token: access_token,
        refresh_token: refresh_token,
        msg: "token refresh complete Complete",
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

module.exports = {
  getLogin,
  getRefreshToken,
  getResetAdminPassword,
  addNewSaleHistory,
};
