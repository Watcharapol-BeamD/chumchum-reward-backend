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
  const getCustomerCode = "select customer_id from Customers where bplus_code = ?";
  const getCustomerCodeInsert = "SELECT ";

  saleHistoryList.map(async (item) => {
    await db.query(adminQueries.getCustomerCode, [item.VxceedCode]).then((res) => {
      const customerId = res[0];
      customerId.map(async (item2) => {
        const pointAmount = Math.floor(item.BillAmount / 500);
        await db.query(adminQueries.addSaleHistory, [
          item.DocDate,
          item.DocRef,
          item.BillAmount,
          pointAmount,
          item2.customer_id,
        ]);
      });
    });
  });

  // const customerList = results[0];

  // const newArr = customerList.map((customer) => {
  //   const matchingSale = saleHistoryList.find(
  //     (sale) => customer.bplus_code === sale.bplus_code
  //   );

  //   if (matchingSale) {
  //     // If there's a match, merge the customer and sale objects
  //     return {
  //       ...customer,
  //       ...matchingSale,
  //     };
  //   }

  //   // If no match is found, return the original customer object
  //   return customer;
  // });

  //  const newArr = customerList.map((item) => {
  //     return saleHistoryList.map((item2) => {
  //       item.bplus_code === item2.bplus_code;
  //     });
  //   });

  // const newArr = customerList.map((customer) => {
  //   return {
  //     ...customer,
  //     hasSale: saleHistoryList.some((sale) => customer.bplus_code === sale.bplus_code)
  //   };
  // });

  //  console.log(newArr)

  // const matchCustomer = customerList.filter((item)=>{
  //   item.bplus_code === saleHistoryList.
  // })

  // console.log(customerList)

  // console.log(saleHistoryList);
  // if (!Array.isArray(saleHistoryList)) {
  //   console.error("Invalid input: req.body is not an array");
  //   return res.status(400).json({ error: "Invalid input" });
  // }

  // console.log("Received saleHistoryList:", saleHistoryList);

  // try {
  //   await Promise.all(
  //     saleHistoryList.map(async (item, index) => {
  //       const { DocDate, DocRef, BillAmount, VxceedCode } = item;

  //       if (!DocDate || !DocRef || !BillAmount || !VxceedCode) {
  //         console.error(`Invalid item at index ${index}:`, item);
  //         throw new Error(`Invalid item at index ${index}`);
  //       }

  //       console.log(`Inserting item ${index}:`, {
  //         DocDate,
  //         DocRef,
  //         BillAmount,
  //         VxceedCode,
  //       });

  //       await db.query(adminQueries.addSaleHistory, [
  //         DocDate,
  //         DocRef,
  //         BillAmount,
  //         VxceedCode,
  //       ]);
  //     })
  //   );

  //   console.log("All items inserted successfully");
  //   res.status(200).json({ message: "Sale history added successfully" });
  // } catch (err) {
  //   console.error("Error inserting sale history:", err);
  //   res.status(500).json({ error: "Failed to add sale history" });
  // }
};

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
