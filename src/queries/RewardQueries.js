const keepRewardToHistory = "INSERT INTO Redeem_Histories (fk_customer_id, fk_reward_id, quantity, points_used) VALUES (?, ?, ?, ?)";
const getRedeemRewardTimestamp = "SELECT redeem_timestamp FROM Redeem_Histories WHERE fk_customer_id = ? ORDER BY redeem_history_id DESC LIMIT 1";
const getRewardRemainQuantity = "SELECT reward_id, quantity FROM Rewards WHERE reward_id = ?";
const getRewardImage = "SELECT reward_image FROM Rewards WHERE reward_id = ?";
const getReward = `
  SELECT r.reward_id, r.name, r.description, r.quantity, r.require_point, r.status, r.event_start_date, r.event_end_date, r.reward_image,reward_type,
         GROUP_CONCAT(cg.group_name SEPARATOR ', ') AS customer_group_name,
         GROUP_CONCAT(cg.group_id SEPARATOR ', ') AS customer_group_id
  FROM Rewards r
  JOIN Reward_Customer_Groups rcg ON r.reward_id = rcg.reward_id
  JOIN Customer_Groups cg ON rcg.group_id = cg.group_id
  GROUP BY r.reward_id
`;
const getRewardAvailableInCurrentTime = `
  SELECT r.reward_id, r.name, r.description, r.quantity, r.require_point, r.status, r.event_start_date, r.event_end_date, r.reward_image,r.reward_type,
         GROUP_CONCAT(cg.group_name SEPARATOR ', ') AS customer_groups
  FROM Rewards r
  JOIN Reward_Customer_Groups rcg ON r.reward_id = rcg.reward_id
  JOIN Customer_Groups cg ON rcg.group_id = cg.group_id
  WHERE (NOW() >= r.event_start_date AND NOW() <= r.event_end_date)
  GROUP BY r.reward_id
`;

const getRewardById = "SELECT * FROM Rewards_View WHERE reward_id = ?";
const addNewReward = "INSERT INTO Rewards (name, require_point, quantity, status, event_start_date, event_end_date, description,reward_type ,reward_image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
const addCustomerGroupToReward = "INSERT INTO Reward_Customer_Groups (reward_id, group_id) VALUES (?, ?) ON DUPLICATE KEY UPDATE reward_id = VALUES(reward_id)";
const decreaseReward = "UPDATE Rewards SET quantity = quantity - ? WHERE reward_id = ?";
const updateRewardDetails = "UPDATE Rewards SET name = ?, require_point = ?, quantity = ?, status = ?, event_start_date = ?, event_end_date = ?, description = ?,reward_type= ? WHERE reward_id = ?";
const updateRewardDetailsAndImage = "UPDATE Rewards SET name = ?, require_point = ?, quantity = ?, status = ?, event_start_date = ?, event_end_date = ?, description = ?,reward_type= ?, reward_image = ? WHERE reward_id = ?";
const getCustomerGroupOfReward = "SELECT * FROM Reward_Customer_Groups WHERE reward_id = ?";
const removeCustomerGroupFromReward = "DELETE FROM Reward_Customer_Groups WHERE reward_id = ? AND group_id = ?";
const getRewardView = "SELECT * FROM Rewards_View";
const getRewardAvailableInCurrentTimeView = "SELECT * FROM Rewards_event_Time_length_view";
const getRewardsByEventTimeAndCustomerGroupView = "SELECT * FROM Rewards_event_Time_length_BY_Customer_Group_View WHERE group_id = ? AND status = 'Active'";
const addSaleHistory = "INSERT INTO Points_Transactions (doc_date, doc_ref, bill_amount, point_amount, fk_customer_id) VALUES (?, ?, ?, ?, ?)";

module.exports = {
    keepRewardToHistory,
    getRedeemRewardTimestamp,
    getRewardRemainQuantity,
    getRewardImage,
    getReward,
    getRewardAvailableInCurrentTime,
    getRewardById,
    addNewReward,
    addCustomerGroupToReward,
    decreaseReward,
    updateRewardDetails,
    updateRewardDetailsAndImage,
    getCustomerGroupOfReward,
    removeCustomerGroupFromReward,
    getRewardView,
    getRewardAvailableInCurrentTimeView,
    getRewardsByEventTimeAndCustomerGroupView,
    addSaleHistory
}