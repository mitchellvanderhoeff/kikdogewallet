/**
 * Created by mitch on 3/1/2014.
 */

function WithdrawCtrl($scope, Wallet) {
   $scope.wallet = Wallet;

   $scope.updateBalanceAfterWithdraw = function (withdrawAmount) {
      $scope.balanceAfterWithdraw = ($scope.wallet.balance - (withdrawAmount || 0))
   };

   function showAlert(message) {
      alert(message);
   }

   $scope.confirmWithdraw = function (address, amountStr) {
      if (!amountStr || amountStr.length == 0) {
         showAlert("You must enter a valid amount!");
         return;
      }
      if (!address || address.length != 34) {
         showAlert("You must enter a valid address!");
         return;
      }
      var amount = parseFloat(amountStr);
      if (amount < 5.0) {
         showAlert("You can't withdraw less than Ð5!");
         return;
      }
      if ($scope.wallet.balance < amount) {
         showAlert('Your balance is too low!');
         return;
      }
      $scope.wallet.withdraw(address, amount, function (error) {
         if (!error) {
            showAlert("Withdraw successful!")
         } else {
            showAlert("Unable to withdraw! Reason: " + error);
         }
         $scope.amount = null;
         $scope.address = null;
      });
   };

   $scope.updateBalanceAfterWithdraw();
   $scope.$on('walletUpdated', $scope.updateBalanceAfterWithdraw);
}
WithdrawCtrl.$inject = ['$scope', 'Wallet'];