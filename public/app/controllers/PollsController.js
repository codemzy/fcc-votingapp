// pulls in all poll data (multiple polls)
angular.module('VoteGoatApp')
.controller('PollsController', ['$scope', 'polls', function($scope, polls) {
  polls.success(function(data) {
    $scope.polls = data;
    $scope.titleLength = function(title) {
      if (title.length > 40) {
        return title.slice(0, 37) + "...";
      } else {
        return title;
      }
    };
  });  
}]);