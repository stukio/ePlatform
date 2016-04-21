angular.module('adminMdl', [])

.controller('adminCtrl', ['$scope', '$http', 'schoolSrv', 'userSrv', '$state', 'Upload', 'railsServer', 'subscriptionValue', 'requestHeaders', function adminController($scope, $http, schoolSrv, userSrv, $state, Upload, railsServer, subscriptionValue, requestHeaders) {

    //* USER INFO */
    if (localStorage.token) {
        function getCurrentUser() {
            userSrv.getCurrentUser().then(function(userPromiseData) {
                $scope.current_user = userPromiseData;
                console.log("Current user @adminController: ", $scope.current_user);
                if (!$scope.current_user.admin) {
                    $state.go("dashboard");
                }
            }, function errorCallback(error) {
                $state.go("dashboard");
            });
        }
    } else {
        $state.go("dashboard");
    }


    /* CONSTANTS */
    var rails_server_path = railsServer;
    $scope.subscription_price = subscriptionValue;


    /* SCHOOL METRICS */
    $http({
        headers: requestHeaders(),
        method: 'GET',
        url: rails_server_path + '/all_users.json'
    }).then(function successCallback(response) {
        $scope.total_users = response.data;
    });

    $http({
        headers: requestHeaders(),
        method: 'GET',
        url: rails_server_path + '/subscribers.json'
    }).then(function successCallback(response) {
        $scope.total_subscriptions = response.data;
    });



    /* SCHOOL CRUD ACTIONS */

    /* READ */
    function getSchoolData() {
        schoolSrv.getSchoolData().then(function successCallback(response) {
            $scope.school = response.data;
        });
    }
    getSchoolData();

    /* UPDATE */
    $scope.updateSchoolData = function(name, thumbnail) {
        Upload.upload({
            headers: requestHeaders(),
            url: rails_server_path + '/schools/1.json',
            method: 'PUT',
            fields: { 'school[name]': name, 'school[thumbnail]': thumbnail },
            fileFormDataName: 'school[thumbnail]'
        }).then(function successCallback(response) {
            getSchoolData();
            $scope.updateSchoolData_status = "alert alert-success";
            $scope.updateSchoolData_message = "School info updated";
            fadeAlert("#updateSchoolData_alert");
        }, function errorCallback(error) {
            $scope.updateSchoolData_status = "alert alert-danger";
            $scope.updateSchoolData_message = "Unable to update school info";
            fadeAlert("#updateSchoolData_alert");
        });
    }


    /* COURSE CRUD ACTIONS */

    /* CREATE */
    $scope.createCourse = function(course_name, course_description, course_thumbnail) {
        Upload.upload({
            headers: requestHeaders(),
            url: rails_server_path + '/courses.json',
            method: 'POST',
            fields: { 'course[name]': course_name, 'course[description]': course_description, 'course[thumbnail]': course_thumbnail },
            fileFormDataName: 'course[thumbnail]'
        }).then(function successCallback(response) {
            getAllCourses();
            $scope.createCourse_status = "alert alert-success";
            $scope.createCourse_message = "Course was created";
            fadeAlert("#createCourse_alert");
        }, function errorCallback(error) {
            $scope.createCourse_status = "alert alert-danger";
            $scope.createCourse_message = "Unable to create course";
            fadeAlert("#createCourse_alert");
        });
    }

    /* READ */
    getAllCourses();

    function getAllCourses() {
        schoolSrv.getAllCourses().then(function successCallback(response) {
            $scope.courses = response.data;
        });
    }

    /* UPDATE */
    $scope.editCourse = function(course) {
        $scope.course_to_edit = course;
        $scope.edit_course_modal = '#edit_course_modal';
    }
    $scope.updateCourse = function(id, name, description, thumbnail) {
        Upload.upload({
            headers: requestHeaders(),
            url: rails_server_path + '/courses/' + id + '.json',
            method: 'PATCH',
            fields: { 'course[name]': name, 'course[description]': description, 'course[thumbnail]': thumbnail },
            fileFormDataName: 'course[thumbnail]'
        }).then(function successCallback(response) {
            getAllCourses();
            $scope.updateCourse_status = "alert alert-success";
            $scope.updateCourse_message = "Course was updated";
            fadeAlert("#updateCourse_alert");
        }, function errorCallback(error) {
            $scope.updateCourse_status = "alert alert-danger";
            $scope.updateCourse_message = "Unable to save changes to course";
        });
    }

    /* DELETE */
    $scope.deleteCourse = function(id) {
        schoolSrv.deleteCourse(id).then(function successCallback(response) {
            console.log("Course was deleted.");
            getAllCourses();
        })
    }

    /* CHAPTER CRUD ACTIONS */

    /* CREATE */
    $scope.createChapter = function(course_id, chapter_name, chapter_description, chapter_video) {
        $scope.new_chapter_name = '';
        $scope.new_chapter_description = '';
        $scope.new_chapter_video = '';
        var chapter_data = {
            name: chapter_name,
            description: chapter_description,
            video_url: chapter_video
        }
        schoolSrv.createChapter(course_id, chapter_data).then(function successCallback(response) {
            schoolSrv.getAllChapters($scope.course_to_edit.id).then(function successCallback(response) {
                $scope.course_to_edit.chapters = response.data;
            });
        }, function() {
            $scope.createChapter_status = "alert alert-danger";
            $scope.createChapter_message = "An error ocurred while creating the chapter";
            fadeAlert("#createChapter_alert");
        });
    }

    /* UPDATE */
    $scope.editChapters = function(course) {
        $scope.course_to_edit = course;
        schoolSrv.getAllChapters($scope.course_to_edit.id).then(function successCallback(response) {
            $scope.course_to_edit.chapters = response.data;
        });
        $scope.edit_chapters_modal = '#edit_chapters_modal';
    }
    $scope.updateChapter = function(course_id, chapter_id, chapter_name, chapter_description, chapter_video) {
        var chapter_data = {
            name: chapter_name,
            description: chapter_description,
            video_url: chapter_video
        };
        schoolSrv.updateChapter(course_id, chapter_id, chapter_data).then(function successCallback(response) {
            $scope.updateChapterData_status = "alert alert-success";
            $scope.updateChapterData_message = "Chapter info updated";
            fadeAlert("#updateChapter_alert");
        }, function errorCallback(error) {
            $scope.updateChapterData_status = "alert alert-danger";
            $scope.updateChapterData_message = "An error ocurred while updating the chapter info";
            fadeAlert("#updateChapter_alert");
        });
    }

    /* DELETE */
    $scope.deleteChapter = function(course_id, chapter_id) {
        schoolSrv.deleteChapter(course_id, chapter_id).then(function successCallback(response) {
                schoolSrv.getAllChapters($scope.course_to_edit.id).then(function successCallback(response) {
                    $scope.course_to_edit.chapters = response.data;
                });
            },
            function errorCallback(error) {
                $scope.deleteChapter_status = "alert alert-danger";
                $scope.deleteChapter_message = "Unable to delete chapter";
                fadeAlert("#deleteChapter_alert");
            })
    }

    function fadeAlert(id) {
        $(id).fadeTo(3000, 0);
    }

}]);
