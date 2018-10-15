const jwt = require("jsonwebtoken");

const secretToken = require("../config/keys").jwtSecretToken;

exports.generateBearer = (user, res, req, message, omniauth = false) => {
  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  };
  jwt.sign(payload, secretToken, { expiresIn: 3600 }, (error, token) => {
    if (error) throw error;
    if (omniauth === true) {
      const io = req.app.get("io");
      io.in(req.session.socketId).emit("google", token);
      res.end();
    } else {
      res.json({
        message: message,
        token: `Bearer ${token}`
      });
    }
  });
};
