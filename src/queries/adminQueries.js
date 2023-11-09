const getLogin = "SELECT * FROM Admins WHERE username = ? AND password = ?";
const getCustomerInfoList = `SELECT * FROM customer_info;`;
const checkIsFirstLogin = `SELECT is_first_login FROM Admins WHERE admin_id = ?`;
const resetPassword = `UPDATE Admins SET password = ? WHERE admin_id = ?`;

module.exports = {
  getLogin,
  getCustomerInfoList,
  checkIsFirstLogin,
  resetPassword,
};
