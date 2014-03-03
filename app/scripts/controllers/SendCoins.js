/**
 * Created by mitch on 2/25/2014.
 */

function SendCoinsCtrl($scope, Wallet) {
   $scope.wallet = Wallet;

   $scope.confirmSendCoins = function () {
      $scope.wallet.sendCoins($scope.transaction.to.username, $scope.transaction.amount,
         function (error) {
            if (!error) { // transaction was successful
               $scope.sendTransactionMessage($scope.transaction);
               $scope.$emit('sendCoinsSuccessful');
            } else {
               console.error(error);
               $scope.$emit('sendCoinsError', error);
            }
            $scope.transaction = null;
            $scope.modal.hide();
         });
   };

   $scope.sendTransactionMessage = function (transaction) {
      var recipient = $scope.sendToCustomConvo ? transaction.to.firstName : "you";
      var message = {
         title: "Dogecoin Wallet",
         text: "Wow! " + $scope.wallet.firstName + " sent " + recipient + " " + transaction.amount + " Dogecoin! Tap this to open your Dogecoin Wallet.",
         pic: 'images/dogecoin.png',
         noForward: true
      };
      if ($scope.sendToCustomConvo) {
         kik.send(message);
      } else {
         kik.send(transaction.to.username, message);
      }
   };
}

SendCoinsCtrl.$inject = ['$scope', 'Wallet'];