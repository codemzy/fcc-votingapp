angular.module('VoteGoatApp')
.factory('poll', ['$http', function($http) {
  this.getPoll = function(pollNum) {
  return $http.get('/api/poll/' + pollNum)
            .success(function(data) {
              return data;
            })
            .error(function(err) {
              return err;
            });
  }
  return this;
}]);
