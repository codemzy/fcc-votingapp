angular.module('VoteGoatApp', ['ngRoute'])

 .controller('MainController', function($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
 })

// app routes
.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
    templateUrl: '/public/app/views/home.html'
    })
    .when('/polls', {
    templateUrl: '/public/app/views/polls.html',
    controller: 'PollsController'
    })
    // logged in routes
    .when('/profile', {
    templateUrl: '/public/app/views/user_profile.html',
    controller: 'ProfileController'
    })
    .when('/poll/:num', {
    templateUrl: '/public/app/views/user_poll.html',
    controller: 'User_PollController'
    })
    // default
    .otherwise({ 
      redirectTo: '/' 
    }); 

});