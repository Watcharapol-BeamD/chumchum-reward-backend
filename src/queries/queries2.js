const getAllUser = "SELECT * FROM Customers;";
const getCustomerById = "SELECT * FROM Customers WHERE customer_id = ?";
const registerNewCustomer =
  "INSERT INTO Customers (customer_id, retailer_name, bplus_code, phone_number,refresh_token)VALUES (?, ?, ?, ?,?)";

const getCheckUserExist =
  "SELECT COUNT(*) AS count FROM Customers WHERE Customer_id =?";

const keepRewardToHistory = `INSERT INTO Redeem_Histories (fk_customer_id,fk_reward_id,quantity, points_used)VALUES(?, ?, ?, ?)`;
const getRedeemRewardTimestamp = `SELECT redeem_timestamp FROM Redeem_Histories RH JOIN Customers C ON C.customer_id =RH.fk_customer_id WHERE C.customer_id = ? ORDER BY RH.redeem_history_id DESC LIMIT 1;`;
const getRewardRemainQuantity =
  "SELECT reward_id,quantity FROM Rewards WHERE reward_id = ?;";
const getReward = `SELECT * FROM Rewards`;
const getRewardById = `SELECT * FROM Rewards WHERE reward_id = ?`;
const updateCustomerInfo = `UPDATE Customers SET province = ?, district=?,sub_district=?, post_code=?,address=? WHERE customer_id = ?;`;
const increasePoint = `UPDATE Customers SET points = points + ? WHERE customer_id = ?;`;
const decreasePoint = `UPDATE Customers SET points = points - ? WHERE customer_id = ?;`;
const addNewRefreshToken = `UPDATE Customers SET refresh_token = ? WHERE customer_id = ?;`;

module.exports = {
  getAllUser,
  registerNewCustomer,
  getCheckUserExist,
  keepRewardToHistory,
  getRedeemRewardTimestamp,
  getRewardRemainQuantity,
  getReward,
  getRewardById,
  getCustomerById,
  updateCustomerInfo,
  increasePoint,
  decreasePoint,
  addNewRefreshToken,
};
