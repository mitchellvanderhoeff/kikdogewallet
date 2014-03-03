/**
 * Created by mitch on 2/20/2014.
 */

var Transactions = require('./db').collection('transactions');

var self = {};

self.insertWithdraw = function(username, amount, toAddress) {
    Transactions.insert({
       type: "withdraw",
       date: new Date().getTime(),
       owner: username,
       toAddress: toAddress,
       amount: amount
    });
};

self.insertDeposit = function(username, amount) {
   Transactions.insert({
      type: "deposit",
      date: new Date().getTime(),
      owner: username,
      amount: amount
   });
};

self.insertSend = function(from, to, amount) {
   Transactions.insert({
      type: "send",
      date: new Date().getTime(),
      owner: from,
      to: to,
      amount: amount
   });
};

self.getTransactions = function(username, limit, callback) {
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