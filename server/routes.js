const express = require("express");
const User = require("./model/user");
const createError = require("http-errors");
require("./dbLogic");

const router = express.Router();

// transfer money from user 'from' to user 'to'
router.post("/send", async (req, res, next) => {
  // get params from request body
  const { from, to, amount } = req.body;

  makeTransition(from, to, amount)
    .then(result => {
      res.status(200).json({ balance: result });
    })
    .catch(err => {
      console.log(err);
      next(createError(err));
    });
});

//check user balance
router.get("/balance/:id", async (req, res, next) => {
  // get user name from url params
  var id = req.params.id;

  checkBalance(id)
    .then(result => {
      res.status(200).json({ balance: result });
    })
    .catch(err => {
      console.log(err);
      next(createError("NotFound"));
    });
});

module.exports = router;
