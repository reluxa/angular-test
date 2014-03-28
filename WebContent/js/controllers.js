'use strict';

/* Controllers */

angular.module('fcApp.controllers', ['ngStorage']).
  controller('FuelController', ['$scope','$localStorage', function($scope, $localStorage) {
	  var fuelController = {};
	  
	  $scope.obj = {}
	  $scope.obj.quantity = 35.0;
	  
	  $scope.test = function() {
		  return "returned fuel entries";
	  };
	  
	  $scope.open = function($event) {
		 $event.preventDefault();
		 $event.stopPropagation();
		 $scope.opened = true;
	  }
	  
	  $scope.consumptions = $localStorage.consumptions;
	  
	  $scope.saveConsumption= function(obj) {
		  if ($localStorage.consumptions == undefined) {
			  $localStorage.consumptions = [];
		  }
		  
		  $localStorage.consumptions.push(obj);
	  };
	  
	  $scope.deleteConsumption= function(obj) {
		  $localStorage.consumptions.splice($localStorage.consumptions.indexOf(obj),1);
	  };
	  
	  return fuelController;
  }  ]);
