const router = require("express").Router();
const Users = require("./users-model");
const mb = require('./monthlybudget/mb-router')
router.use('mb', mb)
router.get("/", (req, res) => {
  Users.getUserByUsername(req.user.username)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ messgae: "User Error" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error" });
    });
});
module.exports = router;
