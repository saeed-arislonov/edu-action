(function () {
	'use strict';

	angular.module('eduAction')
		.controller('formContact', function ($scope, $rootScope, $state, $transitions, $http, toaster) {
		
		

			if ($rootScope.currentUser.contact != null) {
				$scope.contact = $rootScope.currentUser.contact
			} else {
				$scope.contact = {};
			}


			$scope.submitting_contacts = false;
			$scope.submit_contact_form = function (valid) {
				console.log($rootScope.currentUser)
				console.log($rootScope.currentUser.id)
				if (valid) {
					$scope.submitting_contacts = true;
					$scope.contact.user_id = $rootScope.currentUser.id
					var contact_form = $.param($scope.contact);
					console.log($scope.contact);
					$http({
						method: 'POST',
						url: 'http://api.edu-action.com/api/user/save-contact',
						data: contact_form,
						//withCredentials: true,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function (data) {
						toaster.pop('success', "Your information Updated successfully");
						console.log(data);
						$scope.updateCurrentUser();
						$scope.calculateCircle();
						$scope.submitting_contacts = false;
						//	$state.go('home.application.form-objectives');
					}, function (err, status, config, headers) {
						console.log(err, status, config, headers);
						$scope.submitting_contacts = false;
					})
				} else {
					console.log('NOT VALID');
				};
			};
		
	});
	
}());
