'use strict';

/* Controllers */

angular.module('fcApp.controllers', ['ngStorage','firebase']).
  controller('FuelController', ['$scope','$localStorage','$firebase','loginService', 
  	                    function($scope, $localStorage, $firebase, loginService) {


	  var fuelController = {};
	  
	  function init() {
		  $scope.obj = {}
		  $scope.obj.quantity = 35.0;
		  $scope.obj.date = new Date();
		  $scope.obj.odo = $scope.getMaxKM()+100;
		  $scope.lastOdo = $scope.getMaxKM();
		  //$scope.uid = $scope.user.uid;
	  }

	  $scope.test = function() {
		  return "returned fuel entries";
	  };
	  
	  $scope.open = function($event) {
		 $event.preventDefault();
		 $event.stopPropagation();
		 $scope.opened = true;
	  }
	  
	  $scope.consumptions = $firebase(loginService.getFuels());
	  
	  $scope.saveConsumption= function(obj) {
	  	  obj.uid = $scope.user.uid;
	  	  console.log(loginService.getAuth());
	  	  console.log($scope.user);
		  $scope.consumptions.$add(obj);
	  };
	  
	  $scope.deleteConsumption= function(obj) {
		  $scope.consumptions.splice($scope.consumptions.indexOf(obj),1);
	  };

	  
	  $scope.getMaxKM= function(obj) {
  		  var result = 0;
		  if ($scope.consumptions != undefined && $scope.consumptions.length > 0) {
			  result = Math.max.apply(Math,$scope.consumptions.map(function(elem){return elem.odo;}));
		  }
		  return result;
	  };
	  
	  init();
	  
	  return fuelController;
  }  ])


.controller('LoginController', ['$scope','loginService', function($scope, loginService) {
	
	$scope.doFBLogin = function() {
		console.log("Login was called");
		loginService.getAuth().login('facebook');	
	}

	$scope.doGoogleLogin = function() {
		console.log("Login was called");
		loginService.getAuth().login('google');	
	}


	$scope.doLogout = function() {
		console.log("Logout was called");
		loginService.getAuth().logout();
	}
	
}])


.service('loginService', ['$rootScope', function($rootScope) {
	var loginService = {};
	var fuels = new Firebase('https://burning-fire-9910.firebaseio.com/fuels');
	var auth = new FirebaseSimpleLogin(fuels, function(error, user) {
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

	loginService.getFuels = function() {
		return fuels;
	}


	return loginService;
}])

.controller('MenuController', ['$scope','loginService', function($scope, loginService){
	console.log(loginService.getAuth());

	$scope.value = 42;

}]);
