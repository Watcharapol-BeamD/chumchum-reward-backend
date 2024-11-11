exports.addNewBPlusCode = `INSERT INTO Retailer_Codes (bplus_code, retailer_name, activation) VALUES (?, ?, ?);`;
exports.getEditRetailerInfo = `UPDATE Retailer_Codes SET retailer_name = ? WHERE bplus_code = ?;`;
