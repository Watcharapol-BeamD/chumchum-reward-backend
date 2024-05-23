const getLogin = "SELECT * FROM Admins WHERE username = ? AND phone_number = ?";
const checkIsFirstLogin = `SELECT is_first_login FROM Admins WHERE admin_id = ?`;
const resetPassword = `UPDATE Admins SET password = ?,is_first_login = 0 WHERE admin_id = ?`;
const getAdminDetails = `SELECT * FROM Admins WHERE admin_id = ?`;
const getRefreshToken = `SELECT refresh_token FROM Admins WHERE admin_id = ?`;
const addRefreshToken = `UPDATE Admins SET refresh_token = ? WHERE admin_id = ?;`;

//---------------------------- CSV Start------------------------------

const addSaleHistory = `INSERT INTO Points_Transactions (doc_date, doc_ref, bill_amount,point_amount,fk_customer_id)VALUES (?,?,?,?,?);`;
const getCustomerCode =
  "SELECT customer_id FROM Customers WHERE bplus_code = ?";
//---------------------------- CSV End------------------------------

module.exports = {
  getLogin,
  checkIsFirstLogin,
  resetPassword,
  getAdminDetails,
  getRefreshToken,
  addRefreshToken,
  addSaleHistory,
  getCustomerCode,
};
