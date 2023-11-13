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

const updateCustomerInfo = `UPDATE Customers SET province = ?, district=?,sub_district=?, post_code=?,address=? WHERE customer_id = ?;`;
const increasePoint = `UPDATE Customers SET points = points + ? WHERE customer_id = ?;`;
const decreasePoint = `UPDATE Customers SET points = points - ? WHERE customer_id = ?;`;
const getRewardImage = `SELECT reward_image FROM Rewards WHERE reward_id = ?;`;

//----------------------reward----------------------------
const getReward = `SELECT r.reward_id,r.name,r.description,r.quantity,r.require_point,r.status,r.event_start_date,r.event_end_date,r.reward_image,GROUP_CONCAT(cg.group_name SEPARATOR ', ') AS customer_groups
FROM Rewards r JOIN Reward_Customer_Groups rcg ON r.reward_id = rcg.reward_id JOIN Customer_Groups cg ON rcg.group_id = cg.group_id GROUP BY r.reward_id;`;

const getRewardAvailableInCurrentTime = `SELECTr.reward_id,r.name,r.description,r.quantity,r.require_point,r.status,r.event_start_date,r.event_end_date,r.reward_image,
GROUP_CONCAT(cg.group_name SEPARATOR ', ') AS customer_groups FROM Rewards r JOIN Reward_Customer_Groups rcg ON r.reward_id = rcg.reward_id JOIN
Customer_Groups cg ON rcg.group_id = cg.group_id WHERE (CURDATE() >= r.event_start_date AND CURDATE() <= r.event_end_date) AND CURTIME() >= TIME(r.event_start_date) AND CURTIME() <= TIME(r.event_end_date) GROUP BY
r.reward_id;
`;

const getRewardById = `SELECT * FROM Rewards WHERE reward_id = ?`;
const addNewReward = `INSERT INTO Rewards (name,require_point, customer_group,quantity, status,event_start_date, event_end_date,description,reward_image)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const decreaseReward = `UPDATE Rewards SET quantity = quantity - ? WHERE reward_id = ?;`;
const updateRewardDetails = `UPDATE Rewards SET name = ?, require_point=?,customer_group=?, quantity=?,status=?,event_start_date=?,event_end_date=?,description=? WHERE reward_id = ?;`;
const updateRewardDetailsAndImage = `UPDATE Rewards SET name = ?, require_point=?,customer_group=?, quantity=?,status=?,event_start_date=?,event_end_date=?,description=?,reward_image=? WHERE reward_id = ?;`;
const adminActionToReward = `INSERT INTO Admin_Reward_Histories (action, fk_admin_id, fk_reward_id)VALUES (?, ?, ?);`;

//----------------------reward-End---------------------------

//----------------------------useless----------------------------
const addNewRefreshToken = `UPDATE Customers SET refresh_token = ? WHERE customer_id = ?;`;
const getRefreshToken = `SELECT refresh_token FROM Customers WHERE customer_id = ?`;
const getUpdateRefreshToken = `UPDATE Customers SET refresh_token = ? WHERE customer_id = ?;`;
// --------------------------------------------------------

//-------------------------Rewards-View-----------------------------------------
const getRewardView = "SELECT * FROM Rewards_View;";
const getRewardAvailableInCurrentTimeView =
  "SELECT * from Rewards_event_Time_length_view";
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
  updateRewardDetails,
  updateRewardDetailsAndImage,
  adminActionToReward,
  getRewardAvailableInCurrentTime,
  getRewardView,
  getRewardAvailableInCurrentTimeView,
};
