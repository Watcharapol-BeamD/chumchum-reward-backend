const getLogin = "SELECT * FROM Admins WHERE username = ? AND phone_number = ?";
const checkIsFirstLogin =
  "SELECT is_first_login FROM Admins WHERE admin_id = ?";
const resetPassword =
  "UPDATE Admins SET password = ?, is_first_login = 0 WHERE admin_id = ?";
const getAdminDetails = "SELECT * FROM Admins WHERE admin_id = ?";
const getRefreshToken = "SELECT refresh_token FROM Admins WHERE admin_id = ?";
const addRefreshToken =
  "UPDATE Admins SET refresh_token = ? WHERE admin_id = ?";
const adminActionToReward =
  "INSERT INTO Admin_Reward_Histories (action, fk_admin_id, fk_reward_id) VALUES (?, ?, ?)";
const getRedeemRewardHistory = `SELECT rh.redeem_timestamp,c.bplus_code,c.retailer_name,r.name,rh.points_used FROM Customers c  JOIN Redeem_Histories rh ON c.customer_id = rh.fk_customer_id JOIN Rewards r ON r.reward_id = rh.fk_reward_id ;
 `;
 
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
  adminActionToReward,
  getRedeemRewardHistory,
};
