const express = require("express");
const User = require("./model/user");

// transfer money from user 'from' to user 'to'
makeTransition = async (from, to, amount) => {
  try {
    // validate that we get all params (from, to, amount)
    if (!(from && to && amount)) {
      throw "bad params";
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
      throw `didnt find ${from} user or balance too low`;
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
      throw `didnt find ${to} user`;
    }

    return result.balance;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//check user balance
checkBalance = async user_id => {
  // get user name from url params
  var id = user_id;

  try {
    // search for the user and return his balance
    const result = await User.find({ name: id });
    console.log(result);
    return result[0].balance;
  } catch (err) {
    console.log(err);
    throw "NotFound";
  }
};

module.exports = { checkBalance };
