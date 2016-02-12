angular.module('VoteGoatApp')
.factory('poll', ['$http', function($http) {
  return $http.get('/api/poll' + this.pollNum)
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
}]);