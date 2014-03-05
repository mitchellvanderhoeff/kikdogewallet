/**
 * Created by mitch on 3/4/2014.
 */
angular.module('kikDogeWalletApp')
   .directive('selectOnClick', function () {
      return {
         restrict: 'A',
         link: function (scope, element, attrs) {
            element.on('click', function () {
               this.select();
            });
         }
      };
   });