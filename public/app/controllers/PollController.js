angular.module('VoteGoatApp')
.controller('PollController', ['$scope', 'polls', function($scope, polls) {
  polls.success(function(data) {
    $scope.polls = data;
  });  
}]);