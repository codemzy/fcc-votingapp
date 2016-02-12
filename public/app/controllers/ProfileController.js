angular.module('VoteGoatApp')
.controller('ProfileController', ['$scope', 'user', function($scope, user) {
  user.success(function(data) {
    $scope.user = data;
    // set the username
    var username = "You";
    if (data.twitter.displayName != undefined) {
        username = data.twitter.displayName;
    }
    else if (data.facebook.displayName != undefined) {
        username = data.facebook.displayName;
    }
    $scope.user.username = username;
  });  
}]);