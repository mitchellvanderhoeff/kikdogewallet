/**
 * Created by mitch on 2/25/2014.
 */

function SendCoinsCtrl($scope, Wallet) {
   $scope.wallet = Wallet;
   $scope.sendToOptions = [
      {
         value: 'recipient',
         description: $scope.transaction.to.fullName
      },
      {
         value: 'conversation',
         description: 'A Conversation'
      },
      {
         value: 'nobody',
         description: "Don't Send Message"
      }
   ];

   $scope.data = {
      sendTo: 'recipient'
   };

   $scope.confirmSendCoins = function (sendTo) {
      $scope.wallet.sendCoins($scope.transaction.to.username, $scope.transaction.amount,
         function (error) {
            if (!error) { // transaction was successful
               if (sendTo != 'nobody') {
                  var sendToCustomConvo = (sendTo == 'conversation');
                  $scope.sendTransactionMessage($scope.transaction, sendToCustomConvo);
               }
               $scope.$emit('sendCoinsSuccessful');
            } else {
               console.error(error);
               $scope.$emit('sendCoinsError', error);
            }
            $scope.transaction = null;
            $scope.modal.hide();
         });
   };

   $scope.sendTransactionMessage = function (transaction, sendToCustomConvo) {
      var recipient = sendToCustomConvo ? transaction.to.firstName : "you";
      var message = {
         title: "Dogecoin Wallet",
         text: "Wow! " + $scope.wallet.firstName + " sent " + recipient + " " + transaction.amount + " Dogecoin! Tap this to open your Dogecoin Wallet.",
         pic: 'images/dogecoin.png',
         noForward: true
      };
      if (sendToCustomConvo) {
         kik.send(message);
      } else {
         kik.send(transaction.to.username, message);
      }
   };
}

SendCoinsCtrl.$inject = ['$scope', 'Wallet'];