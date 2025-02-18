var jwt = require("jsonwebtoken");

function signToken(payload) {
  const token = jwt.sign(payload, process.env.secret, { expiresIn: "1h" });
}

module.exports = signToken;
