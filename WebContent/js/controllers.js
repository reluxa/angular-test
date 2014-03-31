'use strict';

/* Controllers */

angular.module('fcApp.controllers', ['ngStorage', 'fcApp.services']).
  controller('FuelController', function($scope, FuelService, $routeParams, $location) {
	  var fuelController = {};
	  
	  function init() {
		  if ($routeParams.id) {
			  $scope.obj = FuelService.load($routeParams.id);
		  } 
		  
		  if ($scope.obj == undefined) {
			  $scope.obj = {};
			  $scope.obj.quantity = 35.0;
			  $scope.obj.date = new Date();
			  $scope.obj.odo = $scope.getMaxKM()+100;
			  $scope.lastOdo = $scope.getMaxKM();
		  }
	  }

	  $scope.open = function($event) {
		 $event.preventDefault();
		 $event.stopPropagation();
		 $scope.opened = true;
	  };
	  
	  $scope.consumptions = FuelService.getAll();
	  
	  $scope.saveConsumption= function(fueling) {
		  if (FuelService.save(fueling)) {
			  
		  } else {
			  
		  }
	  };
	  
	  $scope.deleteConsumption = function(fueling) {
		  FuelService.remove(fueling);
	  };
	  
	  $scope.getMaxKM = function() {
		  return FuelService.getMaxKM();
	  };
	  
	  $scope.openForEdit = function(id) {
		  $location.path("/edit/"+id);
	  };
	  
	  
	  init();
	  
	  return fuelController;
  } )
  
  
  .controller("HomeController", function() {
	  
  });
