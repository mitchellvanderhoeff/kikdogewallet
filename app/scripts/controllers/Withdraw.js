/**
 * Created by mitch on 3/1/2014.
 */

function WithdrawCtrl($scope, Wallet, $ionicLoading, InterfaceState, QRCodeService) {
   $scope.wallet = Wallet;
   InterfaceState.sidebarDraggable = false;

   function showError(message) {
      $scope.error = message;
      setTimeout(function () {
         $scope.$apply(function () {
            $scope.error = null;
         });
      }, 2000);
   }

   function showLoading() {
      $scope.loading = $ionicLoading.show({
         content: 'Withdrawing.. ' +
            '<i class="icon ion-loading-d"></i>',
         animation: 'fade-in',
         showBackdrop: true,
         maxWidth: 200,
         showDelay: 0
      });
   }

   function hideLoading() {
      $scope.loading.hide();
   }

   $scope.confirmWithdraw = function (address, amountStr) {
      if (!amountStr || amountStr.length == 0) {
         showError("You must enter a valid amount!");
         return;
      }
      if (!address || address.length != 34) {
         showError("You must enter a valid address!");
         return;
      }
      if (address == $scope.wallet.address) {
         showError("You can't withdraw to your own address!")
      }
      var amount = parseFloat(amountStr);
      if (amount < 5.0) {
         showError("You can't withdraw less than Ð5!");
         return;
      }
      if ($scope.wallet.balance < amount) {
         showError('Your balance is too low!');
         return;
      }

      showLoading();
      $scope.wallet.withdraw(address, amount, function (error) {
         hideLoading();
         if (error) {
            showError("Unable to withdraw! Reason: " + error);
         }
         $scope.amount = null;
         $scope.address = null;
      });
   };

   $scope.scanQRCode = function () {
      QRCodeService.scanQRCode(function (qrData) {
         $scope.$apply(function () {
            $scope.address = qrData;
         })
      })
   };

   $scope.$on('$viewContentLoaded', function () {
      $scope.sideMenuController.close();
   });
}
WithdrawCtrl.$inject = ['$scope', 'Wallet', '$ionicLoading', 'InterfaceState', 'QRCodeService'];