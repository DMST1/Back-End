const jwt = require("jsonwebtoken");
const secrets = require("../auth/secrets");

module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === "testing") {
    req.user = req.body
    // req.body.username = undefined
    next();
    
  } else {
    let token = req.headers.authorization;

    if (token) {
      let secret = secrets.jwtSecret;
      jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
          res.status(401).json({ message: "Error decoding token" });
        } else {
          req.user = { username: decodedToken.username };
          res.decodedToken = decodedToken;
          next();
        }
      });
    } else {
      res.status(401).json({
        message: "No token provided (are you logged in?)."
      });
    }
  }
};
