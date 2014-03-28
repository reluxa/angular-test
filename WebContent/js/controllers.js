'use strict';

/* Controllers */

angular.module('fcApp.controllers', ['ngStorage']).
  controller('FuelController', ['$scope','$localStorage', function($scope, $localStorage) {
	  var fuelController = {};
	  
	  function init() {
		  $scope.obj = {}
		  $scope.obj.quantity = 35.0;
		  $scope.obj.date = new Date();
		  $scope.obj.odo = $scope.getMaxKM()+100;
		  $scope.lastOdo = $scope.getMaxKM();
	  }

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
	  
	  $scope.getMaxKM= function(obj) {
		  var result = Math.max.apply(Math,$localStorage.consumptions.map(function(elem){return elem.odo;}));
		  return result;
	  };
	  
	  init();
	  
	  return fuelController;
  }  ]);
