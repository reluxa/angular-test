'use strict';

/* Controllers */

angular.module('fcApp.controllers', ['ngStorage','firebase']).
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
  		  var result = 0;
		  if ($localStorage.consumptions != undefined) {
			  result = Math.max.apply(Math,$localStorage.consumptions.map(function(elem){return elem.odo;}));
		  }
		  return result;
	  };
	  
	  init();
	  
	  return fuelController;
  }  ])


.controller('LoginController', ['$scope','loginService', function($scope, loginService) {
	
	$scope.doLogin = function() {
		console.log("Login was called");
		loginService.getAuth().login('facebook');	
	}

	$scope.doLogout = function() {
		console.log("Logout was called");
		loginService.getAuth().logout();
	}
	
}])


.service('loginService', ['$rootScope', function($rootScope) {
	var loginService = {};

	var chatRef = new Firebase('https://burning-fire-9910.firebaseio.com/');
	var auth = new FirebaseSimpleLogin(chatRef, function(error, user) {
		if (error) {
		    // an error occurred while attempting login
		    console.log(error);
		  } else if (user) {
		  	$rootScope.$apply(function(){
		  		$rootScope.user = user;	
		  	})
		    // user authenticated with Firebase
		    console.log('User ID: ' + user.uid + ', Provider: ' + user.provider);
		  } else {
		  	$rootScope.$apply(function(){
		  		$rootScope.user = null;	
		  	})
		  }
		});
	
	loginService.getAuth = function() {
		return auth;
	}

	return loginService;
}])

.controller('MenuController', ['$scope','loginService', function($scope, loginService){
	console.log(loginService.getAuth());

	$scope.value = 42;

}]);
