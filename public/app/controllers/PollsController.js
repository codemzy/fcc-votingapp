// pulls in all poll data (multiple polls)
angular.module('VoteGoatApp')
.controller('PollsController', ['$scope', 'polls', function($scope, polls) {
  polls.success(function(data) {
    $scope.polls = data;
  });  
}]);