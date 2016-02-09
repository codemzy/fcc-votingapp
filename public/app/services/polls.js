angular.module('VoteGoatApp')
.factory('polls', ['$http', function($http) {
  return $http.get('/api/polls')
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);