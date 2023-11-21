require("dotenv").config();
const jwt = require("jsonwebtoken");

//***use for admin only */
const jwtAccessTokenGenerate = (user) => {
  const accessToken = jwt.sign(
    { admin_id: user.admin_id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "20m", algorithm: "HS256" }
  );

  return accessToken;
};

const jwtRefreshTokenGenerate = (user) => {
  const refreshToken = jwt.sign(
    { admin_id: user.admin_id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "14d", algorithm: "HS256" }
  );

  return refreshToken;
};

module.exports = { jwtAccessTokenGenerate, jwtRefreshTokenGenerate };
