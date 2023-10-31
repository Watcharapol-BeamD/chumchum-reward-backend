const getLogin = "SELECT * FROM Admins WHERE username = ? AND password = ?";

module.exports = { getLogin };
