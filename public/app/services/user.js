angular.module('VoteGoatApp')
.factory('user', ['$http', function($http) {
  this.getUser = function() {
    return $http.get('/api/user')
              .success(function(data) {
                return data;
              })
              .error(function(err) {
                return err;
              });
  };
  return this;
}]);