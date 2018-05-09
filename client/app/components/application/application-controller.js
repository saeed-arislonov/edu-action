(function () {
	'use strict';

	angular.module('eduAction')
		.controller('application', function ($scope, $rootScope, $state, $timeout, application_datas, $localstorage, $http, toaster) {

			console.log($rootScope.currentUser);
			$scope.countryList = application_datas.countries;
			$scope.degreeApplying = application_datas.degreeApplying;
			$scope.currentDegree = application_datas.currentDegree;
			var newData = application_datas.spokenLanguages;
			newData.then(function(resp){
				//console.log(resp);
				$scope.spokenLanguages = resp.data.data;
				console.log($scope.spokenLanguages);
				
			}, function(err){
				console.log(err);
			});
		
			$scope.years = application_datas.years;
			$scope.genders = application_datas.genders;
			$scope.booleans = application_datas.booleans;

			$scope.drawCircle = function (val, color) {
				var progressBarOptions = {
					startAngle: -1.55,
					size: 100,
					value: val,
					fill: {
						color: color
					}
				}

				$('.circle').circleProgress(progressBarOptions).on('circle-animation-progress', function (event, progress, stepValue) {
					if(stepValue == 1) {
						$(this).find('strong').text('100%');	
					} else {
						$(this).find('strong').text(String(stepValue.toFixed(2)).substr(2) + '%');	
					}
				});
			}


			$scope.calculateCircle = function () {
				var array_circle = [],
					sponsor_val, objective_val, contact_val, info_val, files_val;
				if ($rootScope.currentUser.sponsor != null) {
					sponsor_val = .20
				} else {
					sponsor_val = 0
				}
				if ($rootScope.currentUser.objective != null) {
					objective_val = .20
				} else {
					objective_val = 0
				}
				if ($rootScope.currentUser.contact != null) {
					contact_val = .20
				} else {
					contact_val = 0
				}
				if ($rootScope.currentUser.info != null) {
					info_val = .20
				} else {
					info_val = 0
				}
				if ($rootScope.currentUser.userFiles.length > 0) {
					files_val = .20
				} else {
					files_val = 0
				}
				
				var color;
				var final = sponsor_val + objective_val + contact_val + info_val + files_val;
				//console.log("final", final);
				if(final == '1'){
					color = '#38ff48'
				} else {
					color = '#FB6B1D'
				}
				$scope.drawCircle(final.toString(), color)
			};

			$scope.calculateCircle();


			$http.get('http://api.edu-action.com/api/category/exams')
				.then(function (resp) {
				//	console.log('EXAMS ', resp);
				}, function (err) {
					console.log(err)
				});

			$http.get('http://api.edu-action.com/api/category/directions')
				.then(function (resp) {
					$scope.main_majors = resp.data.data;
				//	console.log('$scope.main_majors === > ', $scope.main_majors)
				}, function (err) {
					console.log(err)
				});

			$http.get('http://api.edu-action.com/api/university')
				.then(function (resp) {
					$scope.main_universities = resp.data.data;
				//	console.log('$scope.main_universities === > ', $scope.main_universities)
				}, function (err) {
					console.log(err);
				});

		});
}());