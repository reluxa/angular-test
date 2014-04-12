'use strict';


// Declare app level module which depends on filters, and services
angular.module('fcApp', [
	'ngRoute',
	'ngStorage',
	'uiSlider',
	'fcApp.controllers',
  'ui.bootstrap'
  
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/home',  {templateUrl: 'partials/home.html', controller: 'LoginController'});
  $routeProvider.when('/add',  {templateUrl: 'partials/addfuel.html', controller: 'FuelController'});
  $routeProvider.when('/list', {templateUrl: 'partials/list.html', controller: 'FuelController'});
  $routeProvider.otherwise({redirectTo: '/home'});
 }]).filter('HUF', function() {
    return function(input) {
    	return Math.round(input)  +"\u00A0HUF";
    };
 });