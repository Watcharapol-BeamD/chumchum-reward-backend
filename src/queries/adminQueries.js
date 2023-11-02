const getLogin = "SELECT * FROM Admins WHERE username = ? AND password = ?";
const getCustomerInfoList = `SELECT * from customer_info;`;
 
module.exports = { getLogin, getCustomerInfoList };
