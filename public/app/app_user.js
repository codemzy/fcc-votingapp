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
    templateUrl: '../app/views/home.html'
    })
    // logged in routes
    .when('/profile', {
    templateUrl: '../app/views/user_profile.html',
    controller: 'ProfileController'
    })
    // default
    .otherwise({ 
      redirectTo: '/' 
    }); 

});