angular.module('courseMdl', [])

.controller('courseCtrl', ['$scope', '$location', 'userSrv', 'schoolSrv', '$stateParams', '$sce', '$anchorScroll', function courseController($scope, $location, userSrv, schoolSrv, $stateParams, $sce, $anchorScroll) {

    /* USER INFO */
    userSrv.getCurrentUser().then(function(userPromiseData) {
        $scope.current_user = userPromiseData;
        console.log("Current user @courseController: ", $scope.current_user);
    });

    /* COURSE & CHAPTER CRUD ACTIONS */

    /* READ */
    schoolSrv.getCourse($stateParams.courseId).then(function successCallback(response) {
        $scope.course = response.data;
        getCurrentProgress();
    });

    /* UPDATE */
    $scope.updateChapterStatus = function(chapter_id, chapter_progress) {
        console.log("chapter_progress: ", chapter_progress);
        if (chapter_progress) {
            schoolSrv.markAsIncomplete(chapter_id).then(function successCallback(response) {
                getCurrentProgress();
            });
        } else {
            schoolSrv.markAsComplete(chapter_id).then(function successCallback(response) {
                getCurrentProgress();
            });
        }
    }

    function getCurrentProgress() {
        schoolSrv.getAllChaptersWithProgress($scope.course.id).then(
            function successCallback(response) {
                $scope.course.chapters = response.data;
                var totalChapters = $scope.course.chapters.length;
                var readChapters = 0;
                for (c in $scope.course.chapters) {
                    if ($scope.course.chapters[c].completed) {
                        readChapters++;
                    }
                }
                $scope.progress_percentage = parseInt((readChapters / totalChapters) * 100);
            });
    }

    /* sce is necessary in order to include URLs dynamically on iframes */
    $scope.trustURL = function(url) {
        return $sce.trustAsResourceUrl(url);
    }

    /* menu scroll */
    $scope.gotochapter = function(chapter) {
        var anchor = 'chapter_' + chapter;
        $anchorScroll.yOffset = 150;
        $location.hash(anchor);
        $anchorScroll();
    }

}]);
