const jwt = require("jsonwebtoken");

const JWT = {
  generateToken: (user) => {
    const payload = {
      id: user._id,
      roles: user.roles,
      username: user.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SEC_KEY);
    return token;
  },
  verifyToken: (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SEC_KEY);
    return decoded;
  },
  authenticateToken: (req, res, next) => {
    const token = req.headers["authorization"];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SEC_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  },
};

module.exports = { JWT };
