const getAllUser = "SELECT * FROM users;";
const getUserById = "SELECT * FROM users WHERE user_id = $1 ";

module.exports =
{ getAllUser, getUserById };
