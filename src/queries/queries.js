const getAllUser = "SELECT * FROM Customers;";
const getCustomerById = "SELECT * FROM Customers WHERE customer_id = ?";
const registerNewCustomer =
  "INSERT INTO Customers (customer_id, retailer_name, bplus_code, phone_number,refresh_token)VALUES (?, ?, ?, ?,?)";

const getCheckUserExist =
  "SELECT COUNT(*) AS count FROM Customers WHERE Customer_id =?";

const keepRewardToHistory = `INSERT INTO Redeem_Histories (fk_customer_id,fk_reward_id,quantity, points_used)VALUES(?, ?, ?, ?)`;
const getRedeemRewardTimestamp = `SELECT redeem_timestamp FROM Redeem_Histories WHERE fk_customer_id ='U1a12937aef17947c281f9d3e7cf857b7' ORDER BY redeem_history_id DESC LIMIT 1;`;
const getRewardRemainQuantity =
  "SELECT reward_id,quantity FROM Rewards WHERE reward_id = ?;";
const getReward = `SELECT * FROM Rewards`;
const getRewardById = `SELECT * FROM Rewards WHERE reward_id = ?`;
const updateCustomerInfo = `UPDATE Customers SET province = ?, district=?,sub_district=?, post_code=?,address=? WHERE customer_id = ?;`;
const increasePoint = `UPDATE Customers SET points = points + ? WHERE customer_id = ?;`;
const decreasePoint = `UPDATE Customers SET points = points - ? WHERE customer_id = ?;`;
const getRewardImage = `SELECT reward_image FROM Rewards WHERE reward_id = ?;`;

//----------------------reward----------------------------
const addNewReward = `INSERT INTO Rewards (name,require_point, customer_group,quantity, status,event_start_date, event_end_date,description,reward_image)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const decreaseReward = `UPDATE Rewards SET quantity = quantity - ? WHERE reward_id = ?;`;
//----------------------reward-End---------------------------

//----------------------------useless----------------------------
const addNewRefreshToken = `UPDATE Customers SET refresh_token = ? WHERE customer_id = ?;`;
const getRefreshToken = `SELECT refresh_token FROM Customers WHERE customer_id = ?`;
const getUpdateRefreshToken = `UPDATE Customers SET refresh_token = ? WHERE customer_id = ?;`;
// --------------------------------------------------------

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
  getRewardImage,
  getUpdateRefreshToken,
  getRefreshToken,
  addNewReward,
  decreaseReward,
};
