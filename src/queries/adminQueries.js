const getLogin = "SELECT * FROM Admins WHERE username = ? AND phone_number = ?";
const checkIsFirstLogin = `SELECT is_first_login FROM Admins WHERE admin_id = ?`;
const resetPassword = `UPDATE Admins SET password = ?,is_first_login = 0 WHERE admin_id = ?`;
const getAdminDetails = `SELECT * FROM Admins WHERE admin_id = ?`;
const getRefreshToken = `SELECT refresh_token FROM Admins WHERE admin_id = ?`;
const addRefreshToken = `UPDATE Admins SET refresh_token = ? WHERE admin_id = ?;`;
 

module.exports = {
  getLogin,
  checkIsFirstLogin,
  resetPassword,
  getAdminDetails,
  getRefreshToken,
  addRefreshToken,
};
