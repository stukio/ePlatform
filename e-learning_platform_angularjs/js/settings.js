angular.module('settingsMdl', [])

.controller('settingsCtrl', ['$scope', 'userSrv', 'Upload', 'railsServer', 'requestHeaders', function settingsController($scope, userSrv, Upload, railsServer, requestHeaders) {

    var rails_server_path = railsServer;

    /* USER CRUD ACTIONS */

    /* READ */
    if (localStorage.token) {
        function getCurrentUser() {
            userSrv.getCurrentUser().then(function(userPromiseData) {
                $scope.current_user = userPromiseData;
                console.log("Current user @settingsController: ", $scope.current_user);
            }, function errorCallback(error) {
                $state.go("dashboard");
            });
        }
        getCurrentUser();
    } else {
        $state.go("dashboard");
    }


    /* UPDATE */
    $scope.updateUserData = function(username, current_password, password, password_confirmation, avatar) {
        Upload.upload({
            headers: requestHeaders(),
            url: rails_server_path + '/users.json',
            method: 'PUT',
            fields: { 'user[username]': username, 'user[current_password]': current_password, 'user[password]': password, 'user[password_confirmation]': password_confirmation, 'user[avatar]': avatar },
            fileFormDataName: 'user[avatar]'
        }).then(function successCallback(response) {
            $scope.updateUserData_status = "alert alert-success";
            $scope.updateUserData_response = "User info updated";
            getCurrentUser();
            fadeAlert("#updateUserData_alert");
        }, function() {
            $scope.updateUserData_status = "alert alert-danger";
            $scope.updateUserData_response = "An error ocurred updating the user info";
            fadeAlert("#updateUserData_alert");
        });
    }

    function fadeAlert(id) {
        $(id).fadeTo(3000, 0);
    }

}]);
