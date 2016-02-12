// pulls in one poll data (by poll num)
angular.module('VoteGoatApp')
.controller('PollController', ['$scope', '$routeParams', 'poll', function($scope, $routeParams, poll) {
  poll.getPoll($routeParams.num).success(function(data) {
    $scope.poll = data;
  });  
}]);
