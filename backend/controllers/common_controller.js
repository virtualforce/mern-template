const jwt = require("jsonwebtoken");

const secretToken = require("../config/keys").jwtSecretToken;

module.exports = generateBearer = (user, res, message) => {
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };
  jwt.sign(payload, secretToken, { expiresIn: 3600 }, (error, token) => {
    if (error) throw error;
    res.json({
      message: message,
      token: `Bearer ${token}`
    });
  });
};
