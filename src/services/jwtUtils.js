require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtAccessTokenGenerate = (user) => {
  const accessToken = jwt.sign(
    { customer_id: user.customer_id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "20m", algorithm: "HS256" }
  );

  return accessToken;
};

const jwtRefreshTokenGenerate = (user) => {
  const refreshToken = jwt.sign(
    { customer_id: user.customer_id },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "7d", algorithm: "HS256" }
  );

  return refreshToken;
};

module.exports = { jwtAccessTokenGenerate, jwtRefreshTokenGenerate };
