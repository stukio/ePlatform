angular.module('dashMdl', [])

.controller('dashCtrl', ['$scope', 'schoolSrv', function dashController($scope, schoolSrv) {

    schoolSrv.getAllCourses().then(function successCallback(response) {
        $scope.courses = response.data;
    });
    
}]);