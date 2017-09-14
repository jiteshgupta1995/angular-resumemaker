'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'ngCookies',
  'ngResource',
  'ngSanitize'
]);

app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  // $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

app.constant('appSettings', {
  db: 'http://127.0.0.1:5984/mydatabase'
});

app.service("fetchService", function() {
  return {
  		key: ""
  }
});
