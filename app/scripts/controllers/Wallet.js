/**
 * Created by mitch on 2/25/2014.
 */
function WalletCtrl($scope, Wallet, $ionicModal) {
   $scope.wallet = Wallet;

   $scope.errorMessage = null;
   $scope.pendingTransaction = null;

   function showError(message) {
      alert(message);
   }

   $scope.rightButtons = [
      {
         type: 'button-stable',
         content: '<i class="icon ion-navicon-round"></i>',
         tap: function () {
            $scope.sideMenuController.toggleRight();
         }
      }
   ];

   $scope.updateWallet = function () {
      $scope.wallet.update();
   };

   $scope.popupSendCoinsDialog = function (to, amount) {
      var newScope = $scope.$new();
      newScope.transaction = {
         to: to,
         amount: amount
      };
      $ionicModal.fromTemplateUrl('views/sendCoins.html', function (modal) {
         $scope.modal = modal;
         modal.show();
      }, {
         scope: newScope,
         animation: 'slide-in-up'
      });
   };

   $scope.sendCoins = function (amountStr) {
      if (!amountStr || amountStr.length == 0) {
         showError("You must enter a valid amount!");
         return;
      }
      var amount = parseFloat(amountStr);
      if (amount < 1.0) {
         showError("You can't send less than Ð1!");
         return;
      }
      if ($scope.wallet.balance < amount) {
         showError('Your balance is too low!');
         return;
      }
      $scope.sendCoinsAmount = null;
      kik.pickUsers({
         minResults: 1,
         maxResults: 1
      }, function (users) {
         if (users && users.length == 1) {
            var to = users[0];
            $scope.popupSendCoinsDialog(to, amount);
         }
      });
   };

   $scope.handleSendCoinsRequest = function (request, fail) {
      var to = request.to;
      var amountStr = request.amount;
      if (!amountStr || !to) {
         fail("Invalid send coins request data");
         return;
      }
      var amount = parseFloat(amountStr);
      if (amount <= 0) {
         fail("Send coins amount too low");
         return;
      }
      if (amount > $scope.wallet.balance) {
         fail("Balance too low");
         return;
      }
      $scope.popupSendCoinsDialog(to, amount);
   };

   $scope.checkPicker = function () {
      if (kik.picker && kik.picker.reply) {
         var fail = function (reason) {
            kik.picker.reply({
               success: false,
               message: reason
            });
         };
         var data = kik.picker.data;
         if (!data) {
            fail("Invalid picker data");
            return;
         }
         if (data.sendCoins) {
            $scope.handleSendCoinsRequest(data.sendCoins, fail);
         }
      }
   };

   $scope.$on('walletUpdateFinished', function () {
      $scope.$broadcast('scroll.refreshComplete');
   });

   $scope.$on('walletUpdateError', function (event, error) {
      $scope.$broadcast('scroll.refreshComplete');
      $scope.error = error;
   });

   $scope.$on('sendCoinsError', function (error) {
      if (kik.picker) {
         kik.picker.reply({
            success: false,
            message: error.toString()
         });
      }
   });

   $scope.$on('sendCoinsSuccessful', function () {
      $scope.sendCoinsAmount = null;
      if (kik.picker) {
         kik.picker.reply({
            success: true
         });
      }
   });

   $scope.$on('$destroy', function () {
      if ($scope.modal) {
         $scope.modal.remove();
      }
   });

   $scope.checkPicker();
}

WalletCtrl.$inject = ['$scope', 'Wallet', '$ionicModal'];