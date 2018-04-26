(function () {
	'use strict';

	angular.module('eduAction')
		.controller('application', function ($scope, $rootScope, $state, $timeout, application_datas, $localstorage, $http) {
		
		console.log($localstorage.getObject('currentUser'));
		console.log('why twice')
			$scope.countryList = application_datas.countries;
			$scope.degreeApplying = application_datas.degreeApplying;
			$scope.currentDegree = application_datas.currentDegree;
			$scope.spokenLanguages = application_datas.spokenLanguages;
			$scope.years = application_datas.years;
			$scope.genders = application_datas.genders;
			$scope.booleans = application_datas.booleans;

			var progressBarOptions = {
				startAngle: -1.55,
				size: 100,
				value: 0.55,
				fill: {
					color: '#FB6B1D'
				}
			}

			$('.circle').circleProgress(progressBarOptions).on('circle-animation-progress', function (event, progress, stepValue) {
				$(this).find('strong').text(String(stepValue.toFixed(2)).substr(2) + '%');
			});


			$scope.personal = {};

			$scope.applicationFormSubmitted = false;
			$scope.submitPersonal = function (valid) {
				//if (valid) {
					
						var xsrf = $.param({
							id: "11",
							gender: '1',
							country_of_birth: 'USA',
							city_of_birth: 'Tashkent',
							citizen: 'Uzbekistan',
							education_level: 'high',
							school_attending_now: 'Olanozr tibbiyot',
							graduation: '2020'
						});
						var token = $localstorage.get('access_token');
					$http({
						method: 'POST',
						url: 'http://api.edu-action.com/api/user/save-personal-info',
						data: xsrf,
						//withCredentials: true,
						headers: {
							'Content-Type': 'application/x-www-form-urlencoded',
							'Authorization' : 'Bearer ' + token
						}
					}).then(function(data){
							console.log(data);							
						}, function(err, status, config, headers){
							console.log(err, status, config, headers);
						})

			/*	} else {
					console.log("INVALID")
					$scope.applicationFormSubmitted = true;
				}*/
			}

			/*upload documents*/

			$scope.documents = [
				{
					model: "uploadTranscript",
					id: "transcript"
				}, {
					model: "financialUpload",
					id: "financial"
				}, {
					model: "resumeUpload",
					id: "resume"
				}, {
					model: "essayUpload",
					id: "essay"
				}, {
					model: "toeflUpload",
					id: "toefl"
				}, {
					model: "ieltsUpload",
					id: "ielts"
				}, {
					model: "passportUpload",
					id: "passport"
				}, {
					model: "otherUpload",
					id: "other"
				}
			];

			$scope.uploadsAll = [];

			$scope.openFile = function (what, event) {

				$("#" + what).trigger('click');
				//$scope.idElement = null;
			};

			$scope.pushToArray = function (item) {
				//item.whatt = $(this)
				console.log(item)
				var date = new Date();
				item.uploadedDate = date;
				$scope.uploadsAll.push({
					name: item.name,
					uploadedDate: date,
					id: item.id
				});
				console.log($scope.uploadsAll);
			};
		
		$scope.removeUpload = function(item){
			var index = $scope.uploadsAll.indexOf(item);
  		$scope.uploadsAll.splice(index, 1);  
		}

		});
}());