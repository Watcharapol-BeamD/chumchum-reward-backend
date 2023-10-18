const getAllUser = "SELECT * FROM users;";
const getUserById = "SELECT * FROM users WHERE user_id = $1 ";
const getCheckUserExist =
  "SELECT COUNT(*) AS count FROM users WHERE user_id = $1";
const registerNewUser =
  "INSERT INTO users (user_id, retailer_name, bplus_code, mobile_number)VALUES ($1, $2, $3, $4)";

const keepRewardToHistory =
  "INSERT INTO redeemed_rewards (fk_user_id, reward_name, quantity, timestamp)VALUES ($1, $2, $3, $4)";


// -------------------------------------------
const getReward =  "SELECT * FROM Rewards;"
const getRedeemHistory =  "SELECT * FROM redeem_history;"
const getRedeemHistoryByUserId =  "SELECT RH.*, U.*FROM Redeem_History RH INNER JOIN Users U ON RH.fk_user_id = U.user_id WHERE U.user_id = $1;"
const addNewReward ="INSERT INTO Rewards (reward_id,name, description, quantity)VALUES($1, $2, $3, $4)"
const increaseRewardQuantity = "UPDATE Rewards SET quantity = quantity + $1 WHERE reward_id = $2"
const decreaseRewardQuantity = "UPDATE Rewards SET quantity = quantity - $1 WHERE reward_id = $2;"
const getRewardRemainQuantity  = "SELECT reward_id,quantity FROM Rewards WHERE reward_id = $1;"
const getRedeemReward = "INSERT INTO Redeem_History (timestamp, Redeem_History, quantity, fk_user_id, fk_reward_id)VALUES ($1, $2, $3, $4, $5)"





module.exports = {
  getAllUser,
  getUserById,
  getCheckUserExist,
  registerNewUser,
  keepRewardToHistory,
  getReward,
  getRedeemHistory,
  getRedeemHistoryByUserId,
  addNewReward,
  increaseRewardQuantity,
  decreaseRewardQuantity,
  getRewardRemainQuantity,
  getRedeemReward
};
