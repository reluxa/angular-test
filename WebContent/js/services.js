var module = angular.module('fcApp.services', [ 'ngStorage' ]);

module.service("FuelService", [ '$localStorage', function($localStorage) {

			var fuelService = {};

			function init() {
				if ($localStorage.consumptions == undefined) {
					$localStorage.consumptions = [];
				}
			}

			
			fuelService.load = function(id) {
				for (var i = 0; i < $localStorage.consumptions.length; i++) {
					if ($localStorage.consumptions[i].id == id) {
						return angular.copy($localStorage.consumptions[i]);
					} 
				}
				return null;
			};
			
			fuelService.getAll = function() {
				return $localStorage.consumptions;
			};

			fuelService.save = function(fueling) {
				//update
				if (fueling.id) {
					for (var i = 0; i < $localStorage.consumptions.length; i++) {
						if ($localStorage.consumptions[i].id == fueling.id) {
							$localStorage.consumptions[i] = fueling;
						} 
					}
				} else { //new
					fueling.id = this.nextID();
					$localStorage.consumptions.push(fueling);
				}
			};
			

			fuelService.remove = function(fueling) {
				$localStorage.consumptions.splice($localStorage.consumptions
						.indexOf(fueling), 1);
			};
			
			fuelService.getMaxKM= function() {
				return Math.max.apply(Math,$localStorage.consumptions.map(function(elem){return elem.odo;}));
			};

			fuelService.nextID = function() {
				var result = Math.max.apply(Math,$localStorage.consumptions.map(function(elem){return elem.id;})) + 1;
				if (isFinite(result)) {
					return result;
				} else {
					return 1;
				}
			};

			init();
			return fuelService;

		} ]);