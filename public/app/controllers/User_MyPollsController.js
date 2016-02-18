// pulls in user poll data (multiple polls by user as author)
angular.module('VoteGoatApp')
.controller('User_MyPollsController', ['$scope', 'polls', function($scope, polls) {
  polls.getMyPolls().success(function(data) {
    $scope.polls = data;
    if (!$scope.polls) {
        $scope.nopolls = true;
    }
    $scope.titleLength = function(title) {
      if (title.length > 40) {
        return title.slice(0, 37) + "...";
      } else {
        return title;
      }
    };
  });  
}]);