const getAllUser = "SELECT * FROM Customers;";
const registerNewCustomer =
  "INSERT INTO Customers (customer_id, retailer_name, bplus_code, phone_number)VALUES (?, ?, ?, ?)";
  
const getCheckUserExist =
  "SELECT COUNT(*) AS count FROM Customers WHERE Customer_id =?";



module.exports = { getAllUser, registerNewCustomer,getCheckUserExist };
