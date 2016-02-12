angular.module('VoteGoatApp')
.controller('ProfileController', ['$scope', 'user', function($scope, user) {
  user.success(function(data) {
    $scope.user = data;
  });  
}]);