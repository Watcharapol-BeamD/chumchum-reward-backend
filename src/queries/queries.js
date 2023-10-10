const getAllUser = "SELECT * FROM users;";
const getUserById = "SELECT * FROM users WHERE user_id = $1 ";
const getCheckUserExist =
  "SELECT COUNT(*) AS count FROM users WHERE user_id = $1";
const registerNewUser =
  "INSERT INTO users (user_id, retailer_name, bplus_code, mobile_number)VALUES ($1, $2, $3, $4)";
  
module.exports = {
  getAllUser,
  getUserById,
  getCheckUserExist,
  registerNewUser,
};
