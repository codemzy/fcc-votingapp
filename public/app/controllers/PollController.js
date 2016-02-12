// pulls in single poll data (one poll)
angular.module('VoteGoatApp')
.controller('PollController', ['$scope', '$routeParams', 'poll', function($scope, $routeParams, poll) {
  $scope.pollnumber={};
  this.pollNum = $routeParams.pollNum;
  poll.success(function(data) {
    $scope.poll = data;
  });  
}]);