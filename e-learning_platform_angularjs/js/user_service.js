angular.module('userService', [])

.factory('userSrv', ['$http', '$q', 'railsServer', 'requestHeaders', function($http, $q, railsServer, requestHeaders) {

    var rails_server_path = railsServer;

    // private variables are prefixed by '_'
    var _user = null;

    return {

        getCurrentUser: function() {
            var defer = $q.defer();
            if (_user) {
                // if user exists, resolve with it
                defer.resolve(_user);
            } else {
                // if not ask for it
                $http({
                    headers: requestHeaders(),
                    method: 'GET',
                    url: rails_server_path + '/my_current_user.json'
                }).then(function successCallback(response) {
                    defer.resolve(response.data);
                }, function errorCallback(error) {
                    defer.reject(error);
                });
            }
            return defer.promise;
        }
    }

}]);
