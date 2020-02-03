const router = require("express").Router();
const Users = require("./users-model");

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
router.get("/mb", (req, res) => {
  Users.getMonthlyBudget(req.user.username).then(mb => {
    if (mb) {
      res.status(200).json(mb);
    } else {
      res
        .status(500)
        .json({
          message: "This User hasn't filled out their monthly budget yet!"
        });
    }
  });
});

router.get("/mb/total", (req, res) => {
  Users.getMonthlyBudgetTotal(req.user.username).then(mb => {
    if (mb) {
      const totalValue = obj => Object.values(obj).reduce((a, b) => a + b);
      console.log(totalValue(mb));
      res.mbTotal = totalValue(mb)
      res.status(200).json(totalValue(mb));
    } else {
      res
        .status(500)
        .json({
          message: "This User hasn't filled out their monthly budget yet"
        });
    }
  });
});
router.post("/mb", (req, res) => {
  Users.getUserByUsername(req.user.username)
    .then(user => {
      Users.createMonthlyBudget(req.body, user.id)
        .then(response => {
          res.status(201).json(response);
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: "Error, do you already have a budget?" });
        });
    })
    .catch(err =>
      res.status(500).json({ message: "This User Probably doesn't exist" })
    );
});

router.put("/mb", (req, res) => {
  Users.getUserByUsername(req.user.username)
    .then(user => {
      Users.updateMonthlyBudget(req.body, user.id)
        .then(response => {
          res.status(200).json(response);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Probably missing required fields" });
        });
    })
    .catch(err => {
      res.status(500).json({ message: "This User probably doesn't exist" });
    });
});
module.exports = router;

//relocation cost
router.get("/rc", (req, res) => {
  Users.getRelocationCost(req.user.username).then(rc => {
    if (rc) {
      res.status(200).json(rc);
    } else {
      res
        .status(500)
        .json({
          message: "This User hasn't filled out their relocation costs yet!"
        });
    }
  });
});

router.get("/rc/total", (req, res) => {
  Users.getRelocationCostTotal(req.user.username).then(rc => {
    if (rc) {
      const totalValue = obj => Object.values(obj).reduce((a, b) => a + b);
      console.log(totalValue(rc));
      res.rcTotal = totalValue(rc)
      res.status(200).json(totalValue(rc));
    } else {
      res
        .status(500)
        .json({
          message: "This User hasn't filled out their relocation costs budget yet"
        });
    }
  });
});
router.post("/rc", (req, res) => {
  Users.getUserByUsername(req.user.username)
    .then(user => {
      Users.createRelocationCost(req.body, user.id)
        .then(response => {
          res.status(201).json(response);
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: "Error, do you already have a relocation costs budget?" });
        });
    })
    .catch(err =>
      res.status(500).json({ message: "This User Probably doesn't exist" })
    );
});

router.put("/rc", (req, res) => {
  Users.getUserByUsername(req.user.username)
    .then(user => {
      Users.updateRelocationCost(req.body, user.id)
        .then(response => {
          res.status(200).json(response);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json({ message: "Probably missing required fields" });
        });
    })
    .catch(err => {
      res.status(500).json({ message: "This User probably doesn't exist" });
    });
});
module.exports = router;