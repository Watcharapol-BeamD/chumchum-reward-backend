const getAllUser = "SELECT * FROM Customers;";
const registerNewCustomer =
  "INSERT INTO Customers (customer_id, retailer_name, bplus_code, phone_number)VALUES (?, ?, ?, ?)";

const getCheckUserExist =
  "SELECT COUNT(*) AS count FROM Customers WHERE Customer_id =?";

const keepRewardToHistory = `INSERT INTO Redeem_Histories (fk_customer_id,fk_reward_id,quantity, points_used)VALUES(?, ?, ?, ?)`;
const getRedeemRewardTimestamp = `SELECT redeem_timestamp FROM Redeem_Histories`;
const getRewardRemainQuantity =
  "SELECT reward_id,quantity FROM Rewards WHERE reward_id = ?;";
const getReward = `SELECT * FROM Rewards`;
const getRewardById = `SELECT * FROM Rewards WHERE reward_id = ?`

module.exports = {
  getAllUser,
  registerNewCustomer,
  getCheckUserExist,
  keepRewardToHistory,
  getRedeemRewardTimestamp,
  getRewardRemainQuantity,
  getReward,getRewardById
};