(function () {
	'use strict';

	angular.module('eduAction')
		.controller('formSponsors', function ($scope, $rootScope, $state, $transitions, $http, toaster) {
		
		
			$scope.sponsorForm = false;

			if ($rootScope.currentUser.sponsor != null) {
				$scope.sponsor = $rootScope.currentUser.sponsor
			} else {

				$scope.sponsor = {};
			}

			$scope.submitting_sponsors = false;
			$scope.submit_sponsor_form = function (valid) {
				console.log($scope.sponsor);
				if (valid) {
					$scope.submitting_sponsors = true;
					delete $scope.sponsor.id;
					$scope.sponsor.user_id = $rootScope.currentUser.id
					var sponsor_form = $.param($scope.sponsor);
					console.log($scope.sponsor);
					$http({
						method: 'POST',
						url: 'http://api.edu-action.com/api/user/save-sponsor',
						data: sponsor_form,
						//withCredentials: true,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function (data) {
						$scope.submitting_sponsors = false;
						console.log(data);
						$scope.updateCurrentUser();
						toaster.pop('success', "Your information Updated successfully");
						$scope.calculateCircle();
						//	$state.go('home.application.form-objectives');
					}, function (err, status, config, headers) {
						$scope.submitting_sponsors = false;
						console.log(err, status, config, headers);
					})
				} else {
					console.log('NOT VALID');
					$scope.sponsorForm = true;
				}
			};


		
	});
	
}());
