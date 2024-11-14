const addNewRetailerCodeInfo = `INSERT INTO Retailer_Codes (bplus_code, retailer_name, activation) VALUES (?, ?, ?);`;
const getEditRetailerInfo = `UPDATE Retailer_Codes SET retailer_name = ? WHERE bplus_code = ?;`;
const getCheckIsBplusCodeExist = `SELECT COUNT(bplus_code) as count FROM Retailer_Codes WHERE bplus_code = ?;`;
const getRetailerCodeInfo = `SELECT * FROM Retailer_Codes`;
const getRetailerCodeInfoByBPlusCode = `SELECT * FROM Retailer_Codes WHERE bplus_code = ?;`;

//-------------------------
const getAllUser = "SELECT * FROM Customers c JOIN Customer_Groups cg ON c.fk_group_id = cg.group_id";
const getCustomerById = "SELECT * FROM Customers c JOIN Customer_Groups cg ON c.fk_group_id = cg.group_id WHERE customer_id = ?";
const getCustomerByPhoneNumber = "SELECT * FROM Customers WHERE phone_number = ?";
const getCustomerInfoList = "SELECT * FROM customer_info";
const registerNewCustomer = "INSERT INTO Customers (customer_id, retailer_name, bplus_code, phone_number, points, fk_group_id) VALUES (?, ?, ?, ?, ?, ?)";
const getCheckUserExist = "SELECT COUNT(*) AS count FROM Customers WHERE customer_id = ?";
const updateCustomerInfo = "UPDATE Customers SET province = ?, district = ?, sub_district = ?, post_code = ?, address = ? WHERE customer_id = ?";
const increasePoint = "UPDATE Customers SET points = points + ? WHERE customer_id = ?";
const decreasePoint = "UPDATE Customers SET points = points - ? WHERE customer_id = ?";
const getCustomerCode = "SELECT customer_id FROM Customers WHERE bplus_code = ?";
const getCustomerGroup = "SELECT * FROM Customer_Groups";
const getCheckRetailerCode = "SELECT * FROM Retailer_Codes WHERE bplus_code = ?";
const getActivateCustomer = "UPDATE Retailer_Codes SET activation = 1 WHERE bplus_code = ?";

//---------------------------
const getRefreshToken = `SELECT refresh_token FROM Customers WHERE customer_id = ?`;
const getUpdateRefreshToken = `UPDATE Customers SET refresh_token = ? WHERE customer_id = ?;`;

module.exports = {
  getEditRetailerInfo,
  addNewRetailerCodeInfo,
  getCheckIsBplusCodeExist,
  getRetailerCodeInfo,
  getRetailerCodeInfoByBPlusCode,
  getAllUser,getCustomerById,
  getCustomerByPhoneNumber,
  getCustomerInfoList,registerNewCustomer,
  getCheckUserExist,
  updateCustomerInfo,
  increasePoint,
  decreasePoint,
  getCustomerCode,
  getCustomerGroup,
  getCheckRetailerCode,
  getActivateCustomer,
  getRefreshToken,
  getUpdateRefreshToken

};
