var authApp = angular.module('authModule', []);

authApp.controller('authCtrl', ['$scope', '$http', '$location', '$state', 'railsServer', 'StoreLoginData', function authController($scope, $http, $location, $state, railsServer, StoreLoginData) {

    var rails_server_path = railsServer;

    $scope.registerUser = function(user_username, user_email, user_password, user_password_confirmation) {
        var credentials = {
            user: {
                username: user_username,
                email: user_email,
                password: user_password,
                password_confirmation: user_password_confirmation
            }
        };
        $http({
            method: 'POST',
            url: rails_server_path + '/users.json',
            data: credentials
        }).then(function successCallback(response) {
            $scope.loginUser(user_email, user_password, false);
        }, function errorCallback(error) {
            $scope.sign_up_status = "alert alert-danger";
            $scope.sign_up_message = "Unable to complete registration";
            fadeAlert("#sign_up_alert");
        });
    }

    $scope.loginUser = function(user_email, user_password) {
        var credentials = {
            user: {
                email: user_email,
                password: user_password
            }
        };
        $http({
            method: 'POST',
            url: rails_server_path + '/users/sign_in.json',
            data: credentials
        }).then(function successCallback(response) {
            console.log(response.data);
            // save email and token in local storage
            var authentication_token = response.data.authentication_token;
            var email = response.data.user.email;
            StoreLoginData(authentication_token, email);
            // shows dashboard
            $state.go("dashboard");
        }, function errorCallback(error) {
            $scope.login_status = "alert alert-danger";
            $scope.login_message = "Invalid email or password";
            fadeAlert("#login_alert");
        });
    }

    $scope.forgotPassword = function(user_email) {
        $http({
            method: 'GET',
            url: rails_server_path + '/send_password.json?user_email=' + user_email
        }).then(function successCallback(response) {
            $scope.forgot_status = "alert alert-success";
            $scope.forgot_message = "Please check your inbox";
            fadeAlert("#forgot_alert");
        }, function errorCallback(error) {
            $scope.forgot_status = "alert alert-danger";
            $scope.forgot_message = "Unable to send recovery email";
            fadeAlert("#forgot_alert");
        });
    }

    $scope.resetPassword = function(new_password, confirm_new_password) {
        var reset_token = $location.search().reset_password_token;
        $http({
            method: 'PUT',
            url: rails_server_path + '/users/password.json',
            data: {
                user: {
                    password: new_password,
                    confirm_password: confirm_new_password,
                    reset_password_token: reset_token
                }
            }
        }).then(function successCallback(response) {
            $location.search('reset_password_token', null);
            $state.go("login");
        }, function errorCallback(error) {
            $scope.reset_status = "alert alert-danger";
            $scope.reset_message = "Unable to reset password";
            fadeAlert("#reset_alert");
        });
    }

    function fadeAlert(id) {
        $(id).fadeTo(3000, 0);
    }

}]);

authApp.factory('StoreLoginData', function() {
    return function(authentication_token, email) {
        localStorage.token = authentication_token;
        localStorage.email = email;
    }
});
