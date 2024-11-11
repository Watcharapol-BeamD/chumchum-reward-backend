const addNewBPlusCode = `INSERT INTO Retailer_Codes (bplus_code, retailer_name, activation) VALUES (?, ?, ?);`;
const getEditRetailerInfo = `UPDATE Retailer_Codes SET retailer_name = ? WHERE bplus_code = ?;`;
const getCheckIsBplusCodeExist = `SELECT COUNT(bplus_code) as count FROM Retailer_Codes WHERE bplus_code = ?;`;
const getRetailerCodeInfo = `SELECT * FROM Retailer_Codes`;

module.exports = {
  getEditRetailerInfo,
  addNewBPlusCode,
  getCheckIsBplusCodeExist,
  getRetailerCodeInfo,
};
