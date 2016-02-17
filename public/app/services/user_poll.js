angular.module('VoteGoatApp')
.factory('poll', ['$http', function($http) {
  // get the poll data
  this.getPoll = function(pollNum) {
    return $http.get('/api/user/poll/' + pollNum)
              .success(function(data) {
                return data;
              })
              .error(function(err) {
                return err;
              });
  };
  // add poll vote for registered user
  this.addPollVote = function(pollNum, option) {
    return $http.get('/api/user/vote/' + pollNum + "/" + option)
              .success(function(data) {
                return "Your vote for " + option + " has been submitted.";
              })
              .error(function(err) {
                return err;
              });
  };
  return this;
}]);
