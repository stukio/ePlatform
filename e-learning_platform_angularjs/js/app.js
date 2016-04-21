var mainApp = angular.module('mainApp', ['ui.router', 'authModule', 'dashMdl', 'courseMdl', 'settingsMdl', 'adminMdl', 'paymentsMdl', 'schoolService', 'userService', 'ngFileUpload']);

// path of the rails server

// localhost
//mainApp.constant('railsServer', 'https://localhost:3000');

// heroku
mainApp.constant('railsServer', 'https://stukio-recipe.herokuapp.com');

// we're putting the value of our only plan in a constant, so we can use it across the application
mainApp.constant('subscriptionValue', 30);

// fetches headers from localstorage
mainApp.factory('requestHeaders', function() {
    return function() {
        return {
            'X-USER-EMAIL': localStorage.email,
            'X-USER-TOKEN': localStorage.token
        };
    }
});

mainApp.config(['railsServer', '$stateProvider', '$urlRouterProvider', function(railsServer, $stateProvider, $urlRouterProvider) {

    $stateProvider
        .state("sign_up", {
            url: "/sign_up",
            templateUrl: "./views/sign_up.html",
            controller: "authCtrl"
        })
        .state("login", {
            url: "/login",
            templateUrl: "./views/login.html",
            controller: "authCtrl"
        })
        .state("forgot_password", {
            url: "/forgot_password",
            templateUrl: "./views/forgot_password.html",
            controller: "authCtrl"
        })
        .state("reset_password", {
            url: "/reset_password",
            templateUrl: "./views/reset_password.html",
            controller: "authCtrl"
        })
        .state("dashboard", {
            url: "/dashboard",
            templateUrl: "./views/dashboard.html",
            controller: "dashCtrl"
        })
        .state("course", {
            url: "/courses/{courseId}", // we could also use :courseId
            templateUrl: "./views/course.html",
            resolve: {
                courseId: ['$stateParams', function($stateParams) {
                    return $stateParams.courseId;
                }]
            },
            controller: 'courseCtrl'
        })
        .state("admin", {
            url: "/admin",
            templateUrl: "./views/admin.html",
            controller: "adminCtrl"
        })
        .state("settings", {
            url: "/settings",
            templateUrl: "./views/settings.html",
            controller: "settingsCtrl"
        })
        .state("subscriptions", {
            url: "/subscriptions",
            templateUrl: "./views/subscriptions.html",
            controller: "paymentsCtrl"
        });
    $urlRouterProvider.otherwise("dashboard");
}]);

mainApp.controller('mainCtrl', ['$http', '$scope', '$rootScope', 'userSrv', 'schoolSrv', '$state', 'railsServer', 'requestHeaders', function mainController($http, $scope, $rootScope, userSrv, schoolSrv, $state, railsServer, requestHeaders) {

    var rails_server_path = railsServer;

    $scope.logout = function() {
        $http({
            headers: requestHeaders(),
            method: 'DELETE',
            url: rails_server_path + '/users/sign_out.json'
        }).then(function successCallback(response) {
            delete localStorage.email;
            delete localStorage.token;
            $state.go("login");
        });

    }

    // when controller runs for the first time
    if (localStorage.token) {
        getCurrentUser();
    } else {
        $scope.current_user = undefined;
    }

    // everytime there's a state change
    $rootScope.$on("$stateChangeSuccess", function() {
        if (localStorage.token) {
            getCurrentUser();
        } else {
            $scope.current_user = undefined;
        }
    });

    // user info
    function getCurrentUser() {
        userSrv.getCurrentUser().then(
            function(userPromiseData) {
                $scope.current_user = userPromiseData;
                console.log("Current user @mainController: ", $scope.current_user);
            });
    }

    // school info
    schoolSrv.getSchoolData().then(function successCallback(response) {
        $scope.school = response.data;
    });

}]);
