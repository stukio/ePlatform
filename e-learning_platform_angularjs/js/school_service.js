angular.module('schoolService', [])

.factory('schoolSrv', ['$http', 'railsServer', 'requestHeaders', function($http, railsServer, requestHeaders) {

    var rails_server_path = railsServer;

    return {


        /* SUBSCRIPTIONS CRUD ACTIONS */

        /* CREATE */
        createSubscription: function(token) {
            return $http({
                headers: requestHeaders(),
                method: 'POST',
                url: rails_server_path + '/subscriptions.json',
                data: { stripeToken: token }
            })
        },

        /* DELETE */
        deleteSubscription: function() {
            return $http({
                headers: requestHeaders(),
                method: 'DELETE',
                url: rails_server_path + '/subscriptions.json'
            })
        },


        /* SCHOOL CRUD ACTIONS */

        /* READ */
        getSchoolData: function() {
            return $http({
                headers: requestHeaders(),
                method: 'GET',
                url: rails_server_path + '/schools/1.json'
            })
        },



        /* COURSE CRUD ACTIONS */

        /* READ */
        getCourse: function(course_id) {
            return $http({
                headers: requestHeaders(),
                method: 'GET',
                url: rails_server_path + '/courses/' + course_id + '.json'
            })
        },
        getAllCourses: function() {
            return $http({
                headers: requestHeaders(),
                method: 'GET',
                url: rails_server_path + '/courses.json'
            })
        },
        /* DELETE */
        deleteCourse: function(course_id) {
            return $http({
                headers: requestHeaders(),
                method: 'DELETE',
                url: rails_server_path + '/courses/' + course_id + '.json'
            })
        },



        /* CHAPTER CRUD ACTIONS */

        /* CREATE */
        createChapter: function(course_id, chapter_data) {
            return $http({
                headers: requestHeaders(),
                method: 'POST',
                url: rails_server_path + '/courses/' + course_id + '/chapters.json',
                data: chapter_data
            })
        },
        /* READ */
        getAllChapters: function(course_id) {
            return $http({
                headers: requestHeaders(),
                method: 'GET',
                url: rails_server_path + '/courses/' + course_id + '/chapters.json'
            })
        },
        getAllChaptersWithProgress: function(course_id) {
            return $http({
                headers: requestHeaders(),
                method: 'GET',
                url: rails_server_path + '/chapters/read.json?course_id=' + course_id,
            })
        },
        /* UPDATE */
        updateChapter: function(course_id, chapter_id, chapter_data) {
            return $http({
                headers: requestHeaders(),
                method: 'PUT',
                url: rails_server_path + '/courses/' + course_id + '/chapters/' + chapter_id + '.json',
                data: chapter_data
            })
        },
        markAsComplete: function(chapter_id) {
            return $http({
                headers: requestHeaders(),
                method: 'POST',
                url: rails_server_path + '/chapters/mark_as_complete.json?chapter_id=' + chapter_id
            })
        },
        markAsIncomplete: function(chapter_id) {
            return $http({
                headers: requestHeaders(),
                method: 'DELETE',
                url: rails_server_path + '/chapters/mark_as_incomplete.json?chapter_id=' + chapter_id
            })
        },
        /* DESTROY */
        deleteChapter: function(course_id, chapter_id) {
            return $http({
                headers: requestHeaders(),
                method: 'DELETE',
                url: rails_server_path + '/courses/' + course_id + '/chapters/' + chapter_id + '.json'
            })
        }
    }
}]);
