/**
 * Created by mitch on 2/25/2014.
 */
var app = angular.module("kikDogeWalletApp", [
   'ionic'
]);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
   $stateProvider
      .state('sidebar', {
         url: '/app',
         abstract: true,
         templateUrl: 'views/sidebar.html'
      })
      .state('sidebar.wallet', {
         url: '/wallet',
         views: {
            content: {
               templateUrl: 'views/wallet.html',
               controller: 'WalletCtrl'
            }
         }
      })
      .state('sidebar.withdraw', {
         url: '/withdraw',
         views: {
            content: {
               templateUrl: 'views/withdraw.html',
               controller: 'WithdrawCtrl'
            }
         }
      })
      .state('sidebar.history', {
         url: '/history',
         views: {
            content: {
               templateUrl: 'views/history.html',
               controller: 'HistoryCtrl'
            }
         }
      });

   $urlRouterProvider.otherwise('/app/wallet');
}]);

app.config(['$httpProvider', function ($httpProvider) {
   $httpProvider.defaults.useXDomain = true;
   delete $httpProvider.defaults.headers.common['X-Requested-With'];
}
]);