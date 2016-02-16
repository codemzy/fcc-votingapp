angular.module('VoteGoatApp')
.factory('poll', ['$http', function($http) {
  // get the poll data
  this.getPoll = function(pollNum) {
    return $http.get('/api/poll/' + pollNum)
              .success(function(data) {
                return data;
              })
              .error(function(err) {
                return err;
              });
  };
  // add a poll vote
  // this.addPollVote = function(pollNum, option) {
  //   return $http.post('/api/vote')
  // }
  return this;
}]);
