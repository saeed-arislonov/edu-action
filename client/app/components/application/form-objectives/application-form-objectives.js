(function () {
	'use strict';

	angular.module('eduAction')
		.controller('formObjectives', function ($scope, $rootScope, $state, $transitions, $http, toaster) {
		
		

			/* below lines to submit objective form. */
			if ($rootScope.currentUser.objective != null) {
				$scope.objective = $rootScope.currentUser.objective
			} else {

				$scope.objective = {};
			}
				/*$scope.objective.majors_interested = [];
				$scope.objective.selected_colleges = [];*/

			$scope.select_major = function (item) {
				console.log(item)
				$scope.objective.majors_interested = [];
				$scope.objective.majors_interested.push(item.id);
			};
		
		$scope.sselected_colleges = [];
		

			$scope.start1 = {};
			$scope.submitting_objective = false;
		
		$scope.objective_submitted = false;
		
			$scope.submit_objective = function (valid, array) {
				if(valid){
					$scope.objective.intendent_start_uni = $scope.start1.term + ", " + $scope.start1.year;
				$scope.objective.user_id = parseFloat($rootScope.currentUser.id);
				
				
				console.log(array);
				array.forEach(function(p){
					console.log(p)
					$scope.objective.selected_colleges.push(p.id)
				})
				
				
				console.log($scope.objective)
				$scope.submitting_objective = true;
				var objective_form = $.param($scope.objective);
				$http({
					method: 'POST',
					url: 'http://api.edu-action.com/api/user/save-objectives',
					data: objective_form,
					//withCredentials: true,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function (data) {
					$scope.submitting_objective = false;
					console.log('OBJECTIVEEEEEE', data);
					$scope.updateCurrentUser();
					toaster.pop('success', "Your information Updated successfully");
					$scope.calculateCircle();
					//	$state.go('home.application.form-objectives');
				}, function (err, status, config, headers) {
					$scope.submitting_objective = false;
					console.log(err, status, config, headers);
				})
				} else {
					toaster.pop('error', "Please fill all required fields");
					$scope.objective_submitted = true;
				}
				
			}



			/* === End of user objective files  ===  */

		
		
	});
	
}());
