// pulls in all poll data (multiple polls)
angular.module('VoteGoatApp')
.controller('User_AddPollController', ['$scope', 'add', function($scope, add) {
    $scope.formData = {};  
    $scope.newOption = "";
    $scope.formData.pollOptions = [];
    $scope.help = "You must add at least one option";
    // VALIDATE NEW OPTION AND ADD
    $scope.optionsSubmit = function() {
        var length = $scope.formData.pollOptions.length;
        if (!$scope.newOption) {
            $scope.help = "Answer options cannot be blank";
        } 
        else if (!$scope.formData.pollOptions) {
            $scope.formData.pollOptions = [ $scope.newOption ];
        }
        else {
            for (var i = 0; i < length; i++) {
                // check if option already exists
                if ($scope.newOption == $scope.formData.pollOptions[i]) {
                    $scope.help = "This answer already exists";
                    return;
                }
            }
            $scope.help = false;
            $scope.formData.pollOptions.push($scope.newOption);
        }
    };
    $scope.sendData = function () {
        // check if options have been added and a vote cast
        if (!$scope.formData.pollOptions || !$scope.formData.myVote) {
            $scope.help = "You must add some options and select your vote to add a poll";
        } else {
            var pollData = $.param($scope.formData);
            add.addPoll(pollData).success(function(data) {
                $scope.user = data.user;
            });  
        }
    };
}]);