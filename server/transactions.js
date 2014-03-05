/**
 * Created by mitch on 2/20/2014.
 */

var Transactions = require('./db').collection('transactions');

var self = {};

self.insertWithdraw = function (username, amount, toAddress, txId) {
   console.log("Withdrew Ð" + amount + " from " + username + " to " + toAddress);
   Transactions.insert({
      type: "withdraw",
      date: new Date().getTime(),
      owner: username,
      toAddress: toAddress,
      amount: amount,
      transactionHash: txId
   });
};

self.insertDeposit = function (username, amount) {
   console.log("Deposited Ð" + amount + " into " + username + "'s wallet");
   Transactions.insert({
      type: "deposit",
      date: new Date().getTime(),
      owner: username,
      amount: amount
   });
};

self.insertSend = function (from, to, amount) {
   console.log("Send Ð" + amount + " from " + from + " to " + to);
   Transactions.insert({
      type: "send",
      date: new Date().getTime(),
      owner: from,
      to: to,
      amount: amount
   });
};

self.getTransactions = function (username, limit, callback) {
   Transactions.find({
      $or: [
         {
            owner: username
         },
         {
            to: username
         }
      ]
   }).limit(limit).sort({date: -1}).toArray(callback)
};

module.exports = self;