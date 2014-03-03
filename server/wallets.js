/**
 * Created by mitch on 2/9/2014.
 */

var Wallets = require('./db').collection('Wallets');
var TransactionStorage = require('./transactions');
var _ = require('underscore');
var sendAPIRequest = require('./dogeapi');

var self = {};

function createNewAddress(username, callback) {
   sendAPIRequest({
      a: "get_new_address",
      address_label: username
   }, callback);
}

function withdraw(toAddress, amount, callback) {
   sendAPIRequest({
      a: "withdraw",
      amount: amount,
      payment_address: toAddress
   }, callback);
}

self.checkAddress = function (wallet) {
   sendAPIRequest({
      a: "get_address_received",
      payment_address: wallet.address
   }, function (response) {
      var serverDepositedOnAddress = response.body;
      var amountDeposited = serverDepositedOnAddress - wallet.depositedOnAddress;
      if (amountDeposited > 0) {
         wallet.balance += amountDeposited;
         wallet.depositedOnAddress = serverDepositedOnAddress;
         TransactionStorage.insertDeposit(wallet.username, amountDeposited);
         Wallets.save(wallet);
      }
   });
};

self.createWallet = function (username, callback) {
   createNewAddress(username, function (response) {
      if (response.ok) {
         var newAddress = response.body;
         var newWallet = {
            username: username,
            address: newAddress,
            depositedOnAddress: 0,
            balance: 0
         };
         Wallets.insert(newWallet);
         callback(newWallet);
      } else {
         callback(null);
      }
   });
};

self.getWallet = function (username, callback) {
   Wallets.findOne({
      username: username
   }, function (error, wallet) {
      if (error || !wallet) { // Probably because it doesn't exist
         self.createWallet(username, function (newWallet) {
            if (newWallet) {
               callback(null, newWallet);
            } else {
               callback("ERROR: Cannot create wallet", null);
            }
         });
      } else {
         callback(null, wallet);
         self.checkAddress(wallet);
      }
   })
};

self.sendCoins = function (from, to, amount, callback) {
   if (!_.isNumber(amount) || amount <= 0.0) {
      callback("ERROR: Invalid amount", null);
      return;
   }
   Wallets.findOne({
      username: from
   }, function (error, fromWallet) {
      if (error) {
         callback(error, null);
         return;
      }
      if (fromWallet.balance < amount) {
         callback("ERROR: Not enough balance", null);
         return;
      }
      fromWallet.balance -= amount;
      callback(null, fromWallet);
      Wallets.save(fromWallet);
      this.getWallet(to, function (error, toWallet) {
         toWallet.balance += amount;
         Wallets.save(toWallet);
      });
      TransactionStorage.insertSend(from, to, amount);
   }.bind(this));
};

self.withdraw = function (username, toAddress, amount, callback) {
   function calculateFees(withdrawAmount) {
      return (0.005 * withdrawAmount) + 3;
   }

   if (amount < 5) {
      callback("ERROR: Amount is too low", null);
   }
   Wallets.findOne({
      username: username
   }, function (error, wallet) {
      if (error) {
         callback(error, null);
         return;
      }
      var fees = calculateFees(amount);
      var totalCost = amount + fees;
      if (wallet.balance < totalCost) {
         callback("ERROR: Not enough balance in wallet for transaction", null);
         return;
      }
      withdraw(toAddress, amount, function (response) {
         if (response.ok) {
            wallet.balance -= totalCost;
            callback(null, wallet);
            TransactionStorage.insertWithdraw(username, amount, toAddress);
         } else {
            callback(response.body, null);
         }
      });
   })
};

module.exports = self;