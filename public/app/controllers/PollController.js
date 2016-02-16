var options = {
    segmentShowStroke : true,
    segmentStrokeColor : "#fff",
    segmentStrokeWidth : 6,
    percentageInnerCutout : 50, // This is 0 for Pie charts
  	animation : true,
    animationSteps : 100,
    animationEasing : "easeOutQuart",
    animateRotate : true,
    animateScale : false,
    responsive: true
};

var chartColors = [['#E74C3C', '#C0392B'], ['#3498DB', '#2980B9'], ['#E67E22', '#D35400'], ['#2ECC71', '#27AE60'], ['#34495E', '#2C3E50'], ['#F1C40F', '#F39C12'], ['#1ABC9C', '#16A085'], ['#9B59B6', '#8E44AD']];

// THE CONTROLLER
// pulls in one poll data (by poll num)
angular.module('VoteGoatApp')
.controller('PollController', ['$scope', '$routeParams', 'poll', function($scope, $routeParams, poll) {
  poll.getPoll($routeParams.num).success(function(data) {
    $scope.poll = data.poll;
    $scope.user = data.user;
    // set the chart data
    var chartData = [];
    //TODEL var anyVotes = 0;
    for (var i = 0; i < data.poll.options.length; i++) { 
      //TODEL if (data.poll.options[i].votes > 0) { anyVotes += 1; }
      chartData.push({ "value": data.poll.options[i].votes, "label": data.poll.options[i].option, "color": chartColors[i][0], "highlight": chartColors[i][1] });
    }
    //TODEL if (anyVotes == 0) { chartData.push({ "value": 1, "label": "No votes yet", "color": chartColors[0][0], "highlight": chartColors[0][1] }); }
    // Put the data in the chart
    var ctx = document.getElementById("voteChart").getContext("2d");
    var voteGoatChart = new Chart(ctx).Pie(chartData, options);
    document.getElementById('voteChart-legend').innerHTML = voteGoatChart.generateLegend();
    // check if the user IP has previously voted
    $scope.voted = false;
    // value of selected item
    $scope.myVote = "";
    $scope.message = false;
    // ADD VOTE FUNCTION
    $scope.addVote = function() {
      // UPDATE THE CHART CLIENT SIDE
      for (var j = 0; j < chartData.length; j++) {
        if (chartData[j].label == $scope.myVote.option) {
          voteGoatChart.segments[j].value = chartData[j].value + 1;
          voteGoatChart.update();
          $scope.voted = true;
          $scope.message = 'Your vote for "' + $scope.myVote.option + '" has been submitted';
        }
      }
      // UPDATE THE DB
      poll.addPollVote($routeParams.num, $scope.myVote.option);
    };
    // CHECK IF VOTED BEFORE FUNCTION
    $scope.checkVote = function() {
      if ($scope.voted) {
        return true;
      } else {
        for (var k = 0; k < data.user.poll_votes.length; k++) {
          if (data.user.poll_votes[k] == data.poll.poll_id) {
            return true;
          }
        }
        return false;
      }
    };
  });  
}]);
