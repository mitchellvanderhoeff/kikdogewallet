/**
 * Created by mitch on 2/28/2014.
 */

function SidebarCtrl($scope, $ionicSideMenuDelegate, InterfaceState) {
   $scope.interfaceState = InterfaceState;

   $scope.menuButtons = [
      {
         type: 'button-stable',
         content: '<i class="icon ion-navicon-round"></i>',
         tap: function () {
            $ionicSideMenuDelegate.toggleRight($scope.$$childHead);
         }
      }
   ];

   $scope.openSource = function () {
      kik.open('https://github.com/mitchellvanderhoeff/kikdogewallet');
   };
}

SidebarCtrl.$inject = ['$scope', '$ionicSideMenuDelegate', 'InterfaceState'];