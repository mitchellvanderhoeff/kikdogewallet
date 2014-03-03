/**
 * Created by mitch on 2/9/2014.
 */


angular.module('kikDogeWalletApp')
   .service('Wallet', ['$rootScope', 'DogecoinService', function ($rootScope, DogecoinService) {
      this.balance = null;
      this.address = null;
      this.pastTransactions = [];

      this.extractWalletData = function (walletData) {
         this.balance = walletData.balance;
         this.address = walletData.address;
         this.pastTransactions = walletData.pastTransactions;
         $rootScope.$broadcast('walletUpdateFinished');
      };

      this.updateUserInfo = function () {
         kik.getUser(function (user) {
            if (!user) {
               console.error("Could not acquire username");
               return;
            }
            this.username = user.username;
            this.fullName = user.fullName;
            this.firstName = user.firstName;
            this.lastName = user.lastName;
            this.update();
         }.bind(this))
      };

      this.update = function () {
         $rootScope.$broadcast('walletUpdateStarted');
         DogecoinService.request('/getWallet', {
         }, function (error, walletData) {
            if (error) {
               console.error(error);
               $rootScope.$broadcast('walletUpdateError', error);
               return;
            }
            this.extractWalletData(walletData);
         }.bind(this));
      };

      this.sendCoins = function (to, amount, callback) {
         DogecoinService.request('/sendCoins', {
            to: to,
            amount: amount
         }, function (error, updatedWallet) {
            if (error) {
               console.error(error);
            } else {
               console.log("Transaction successful!");
            }
            this.extractWalletData(updatedWallet);
            callback(error, updatedWallet)
         }.bind(this));
      };

      this.withdraw = function (toAddress, amount, callback) {
         DogecoinService.request('/withdraw', {
            toAddress: toAddress,
            amount: amount
         }, function (error, updatedWallet) {
            if (error) {
               console.error(error);
               callback(error);
               return;
            }
            this.extractWalletData(updatedWallet);
            callback(null, updatedWallet);
         }.bind(this))
      };

      this.getTransactions = function (callback) {
         DogecoinService.request('/getTransactions', {'index': 25 }, callback);
      };

      this.updateUserInfo();
   }]);
