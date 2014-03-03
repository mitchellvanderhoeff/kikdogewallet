/**
 * Created by mitch on 2/11/2014.
 */

angular.module('kikDogeWalletApp')
   .service('DogecoinService', ['$http', function ($http) {
      function makeRequestWithToken(url, requestData, token, callback) {
         kik.sign(token, function (signedToken, username, host) {
            if (!signedToken) {
               callback("ERROR: Could not sign token.", null);
               return;
            }
            var data = _.extend(requestData, {
               host: host,
               signedToken: signedToken,
               username: username
            });
            $http.post(url, data)
               .success(function (data) {
                  callback(null, data);
               })
               .error(function (data) {
                  callback(data, null);
               })
         });
      }

      this.request = function (urlSuffix, requestData, callback) {
         kik.getUser(function (user) {
            if (!user) {
               callback("ERROR: Could not fetch Kik user", null);
               return;
            }
            $http({
               method: 'GET',
               url: '/token',
               params: {
                  username: user.username
               }
            }).success(function (token) {
               makeRequestWithToken(urlSuffix, requestData, token, callback);
            }).error(function (data) {
               callback(data, null);
            });
         });
      };
   }]);