// pulls in all poll data (multiple polls)
angular.module('VoteGoatApp')
.controller('User_AddPollController', ['$scope', 'add', function($scope, add) {
    $scope.formData = {};  
    $scope.newOption = "";
    $scope.formData.pollOptions = [];
    $scope.formData.myVote = false;
    $scope.help = false;
    // VALIDATE NEW OPTION AND ADD
    $scope.optionsSubmit = function() {
        var length = $scope.formData.pollOptions.length;
        if (!$scope.newOption) {
            $scope.help = "Answer options cannot be blank";
        } else {
            for (var i = 0; i < length; i++) {
                // check if option already exists
                if ($scope.newOption == $scope.formData.pollOptions[i].option) {
                    $scope.help = "This answer already exists";
                    return;
                }
            }
            $scope.help = false;
            $scope.formData.pollOptions.push({ "option": $scope.newOption, "votes": 0 });
        }
    };
    $scope.requestClear = function() {
        $scope.clearRequest = true;
    };
    $scope.cancelClear = function() {
        $scope.clearRequest = false;
    };
    $scope.optionsClear = function() {
        $scope.formData.pollOptions = [];
        $scope.clearRequest = false;
    };
    $scope.sendData = function () {
        // check if poll name and options have been added and a vote cast
        if (!$scope.formData.pollName) {
            $scope.help = "You must add a poll name, usually a question";
        }
        else if (!$scope.formData.pollOptions || !$scope.formData.myVote) {
            $scope.help = "You must add some options and select your vote to add a poll";
        } else {
            var length = $scope.formData.pollOptions.length;
            for (var j = 0; j < length; j++) {
                if ($scope.formData.pollOptions[j].option == $scope.formData.myVote.option) {
                    $scope.formData.pollOptions[j].votes = 1;
                }
            }
            var pollData = $.param($scope.formData);
            add.addPoll(pollData).success(function(data) {
                $scope.user = data.user;
            });  
        }
    };
}]);