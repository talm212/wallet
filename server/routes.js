const express = require("express");
const User = require("./model/user");
const createError = require("http-errors");

const router = express.Router();

// transfer money from user 'from' to user 'to'
router.post("/send", async (req, res, next) => {
  try {
    // get params from request body
    const { from, to, amount } = req.body;

    // validate that we get all params (from, to, amount)
    if (!(from && to && amount)) {
      return next(createError(400, "bad params"));
    }

    //search for 'from' user check if his current balance grether then amount and decrement this amount from his account
    //findOneAndUpdate is atomic. link (https://mongoosejs.com/docs/tutorials/findoneandupdate.html#atomic-updates)
    const result = await User.findOneAndUpdate(
      { name: from, balance: { $gte: amount } },
      { $inc: { balance: -amount } },
      { new: true }
    );

    // if we didn't find any user or this user balance not enough for this transition an return error message
    if (!result) {
      return next(
        createError(400, `didnt find ${from} user or balance too low`)
      );
    }

    // find 'to' user and increase his balance with the new amount
    const newResult = await User.findOneAndUpdate(
      { name: to },
      { $inc: { balance: amount } },
      { new: true }
    );

    // if we don't find 'to' user start rollback and return error message
    if (!newResult) {
      const result = await User.findOneAndUpdate(
        { name: from },
        { $inc: { balance: amount } }
      );
      return next(createError(400, `didnt find ${to} user`));
    }

    res.status(200).json({ balance: result.balance });
  } catch (err) {
    next(err);
  }
});

//check user balance
router.get("/balance/:id", async (req, res, next) => {
  // get user name from url params
  var id = req.params.id;

  try {
    // search for the user and return his balance
    const result = await User.find({ name: id });
    res.status(200).json({ balance: result[0].balance });
  } catch (err) {
    console.log(err);
    next(createError("NotFound"));
  }
});

module.exports = router;
