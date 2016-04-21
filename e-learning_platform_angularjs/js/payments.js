angular.module('paymentsMdl', [])

.config(function() {
    
    // This identifies your website in the createToken call below
    Stripe.setPublishableKey('pk_test_ZpLsaWQISlKmyViyC79ARbO4');
})

.controller('paymentsCtrl', ['$scope', 'railsServer', 'userSrv', 'schoolSrv', 'subscriptionValue', '$state', function paymentsController($scope, railsServer, userSrv, schoolSrv, subscriptionValue, $state) {


    /* CONSTANTS */
    $scope.subscription_price = subscriptionValue;


    /* USER INFO */
    if (localStorage.token) {
        function getCurrentUser() {
            userSrv.getCurrentUser().then(function(userPromiseData) {
                $scope.current_user = userPromiseData;
                console.log("Current user @paymentsController: ", $scope.current_user);
                if ($scope.current_user.subscribed == 'pro') {
                    $scope.subscription_type = 'pro';
                } else {
                    $scope.subscription_type = 'basic';
                }
            }, function errorCallback(error) {
                $state.go("dashboard");
            });
        }
        getCurrentUser();
    } else {
        $state.go("dashboard");
    }


    /* SUBSCRIPTION CRUD ACTIONS */

    /* CREATE */
    $scope.createSubscription = function(number, cvc, exp_month, exp_year) {

        Stripe.card.createToken({
            number: number,
            cvc: cvc,
            exp_month: exp_month,
            exp_year: exp_year
        }, function stripeResponseHandler(status, response) {
            var token = response.id;
            schoolSrv.createSubscription(token).then(
                function successCallback(response) {
                    getCurrentUser();
                },
                function errorCallback(error) {
                    $scope.updateSubscription_status = "alert alert-danger";
                    $scope.updateSubscription_response = "An error ocurred while updating your subscription";
                    fadeAlert("#updateSubscription_alert");
                });
        });
    }


    /* DELETE */
    $scope.deleteSubscription = function() {
        schoolSrv.deleteSubscription().then(function successCallback(response) {
            getCurrentUser();
        }, function() {
            $scope.updateSubscription_status = "alert alert-danger";
            $scope.updateSubscription_response = "An error ocurred while updating your subscription";
            fadeAlert("#updateSubscription_alert");
        });
    }

    function fadeAlert(id) {
        $(id).fadeTo(3000, 0);
    }


}]);
