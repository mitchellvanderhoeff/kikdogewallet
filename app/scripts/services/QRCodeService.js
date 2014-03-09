/**
 * Created by mitch on 2014-03-09.
 */
angular.module('kikDogeWalletApp')
   .service('QRCodeService', ['$http', function ($http) {
      this.scanQRCode = function (callback) {
         kik.photo.get({
            quality: 0.7,
            minResults: 1,
            maxResults: 1,
            maxHeight: 300,
            maxWidth: 300
         }, function (photos) {
            if (!photos) {
               callback("Photo getting failed", null);
               return;
            }
            var qrCodeURL = photos[0];
            $http
               .get('/scanQRCode', {
                  params: {
                     fileurl: qrCodeURL
                  }
               })
               .success(function (data) {
                  console.log(JSON.stringify(data)); // todo
               })
               .error(function (error) {
                  callback(error, null);
               });
         });
      }
   }]);