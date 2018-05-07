(function () {
	'use strict';

	angular.module('eduAction')
		.controller('login', function ($scope, $rootScope, $state, $timeout, $http, $localstorage, toaster) {

			console.log($state.params.isLogin);

			$timeout(function () {
				if ($state.params.isLogin == false) {
					console.log("IT IS LOGIN");
					$scope.stage = 'stage1';
					$scope.direction = 1;
				}
			}, 100)

			$rootScope.is_login_page = true;
			$scope.form_submitted = false;

			$scope.register = {}
			$scope.register.name = '';
			$scope.register.lastname = '';
			$scope.register.email = '';
			$scope.register.password = '';
			$scope.register.birth_date = '';
			$scope.password2 = '';

			$scope.matchPassword = function (password2) {
				console.log($scope.register.password, ' == ', password2)
				if ($scope.register.password != password2) {
					/*console.log('Password does not match');*/
					$scope.pass_match = true;
				} else {
					/*console.log('password MATCHSSS')*/
					$scope.pass_match = false;
				}
			};


			$scope.sign_up = function (valid) {
				if (valid) {
					console.log($scope.register)
					$http.post('http://api.edu-action.com/api/user/sign-up', $scope.register)
						.then(function (data) {
							$rootScope.currentUser = data.data.data;
							console.log(data)
							console.log($scope.currentUser)
							$localstorage.setObject('currentUser', $scope.currentUser);
							$localstorage.set('access_token', $scope.currentUser.token);
							$timeout(function () {
								$state.go('home.main');
							}, 100);
						}, function (err) {
							console.log(err);
						});

				} else {
					$scope.form_submitted = true;
					console.log("Form NOT valid")
				}
			};
		
		$scope.popup_open = false;


			$scope.login = {};
			$scope.signin = function (valid) {
				if (valid) {

					var xsrf = $.param($scope.login);
					$http({
						method: 'POST',
						url: 'http://api.edu-action.com/api/user/sign-in',
						data: xsrf,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded'
						}
					}).then(function(data){
							console.log(data);
						$rootScope.currentUser = data.data.data;
							console.log($scope.currentUser)
							$localstorage.setObject('currentUser', $scope.currentUser);
							$localstorage.set('access_token', $scope.currentUser.token);
							$timeout(function () {
								$state.go('home.main');
							}, 100);
						}, function(err, status, config, headers){
							console.log(err, status, config, headers);
							console.log(err.data.message);
						//toaster.pop("danger", "Wrong login or password")
						if(err.data.message == "Не верный логин и/или пароль"){
							toaster.pop("error", "Error", "Wrong login or password")
						}
						})

					/*console.log(valid, $scope.login)
					$http.post('http://api.edu-action.com/api/user/sign-in', $scope.login)
							.then(function(data){
							console.log(data);
						}, function(err, status, config, headers){
							console.log(err, status, config, headers);
						})*/
				} else {
					console.log('not valid')
				}
			}

			$scope.formParams = {};
			$scope.stage = "";
			$scope.formValidation = false;
			$scope.toggleJSONView = false;
			$scope.toggleFormErrorsView = false;


			// Navigation functions
			$scope.next = function (stage) {
				$scope.direction = 1;
				$scope.stage = stage;
			};

			$scope.back = function (stage) {
				$scope.direction = 0;
				$scope.stage = stage;
			};



			$scope.reset = function () {
				// Clean up scope before destorying
				$scope.formParams = {};
				$scope.stage = "";
			}


		});
}());