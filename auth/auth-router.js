const bcrypt = require("bcryptjs");
const router = require("express").Router();
const auth = require("./auth-model");
const secrets = require("./secrets");
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  let { username, password } = req.body;

  bcrypt.hash(password, 12, (err, hashedPassword) => {
    if (err) {

      res
        .status(500)
        .json({ message: "Error while hashing password", error: err });
    } else {
      auth
        .addUser({ username, password: hashedPassword })
        .then(creds => {
          res.status(201).json({ username, token: generateToken({username, password: hashedPassword}), userId: creds[0] });
        })
        .catch(error => {
          console.log(error)
          res.status(500).json({
            message:
              "Error while saving credentials to DB, make sure you provided the correct data for registration. Is username already in use?"
          });
        });
    }
  });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  auth
    .getUserByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token,
          userId: user.id
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(err => {
      res.status(401).json({ message: "Invalid Credentials" });
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };
  const options = {
    expiresIn: "14d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}
module.exports = router;
