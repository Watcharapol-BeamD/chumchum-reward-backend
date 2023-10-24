const getAllUser = "SELECT * FROM Customers;";
const registerNewUser =
  "INSERT INTO users (user_id, retailer_name, bplus_code, mobile_number)VALUES ($1, $2, $3, $4)";

module.exports = {getAllUser};
