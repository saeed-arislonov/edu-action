(function () {
	'use strict';

	angular.module('eduAction')
		.controller('application', function ($scope, $rootScope, $state, $timeout, application_datas, $localstorage, $http, toaster) {

			console.log($rootScope.currentUser);
			console.log('why twice')
			$scope.countryList = application_datas.countries;
			$scope.degreeApplying = application_datas.degreeApplying;
			$scope.currentDegree = application_datas.currentDegree;
			$scope.spokenLanguages = application_datas.spokenLanguages;
			$scope.years = application_datas.years;
			$scope.genders = application_datas.genders;
			$scope.booleans = application_datas.booleans;

		$scope.drawCircle = function(val){
			var progressBarOptions = {
				startAngle: -1.55,
				size: 100,
				value: val,
				fill: {
					color: '#FB6B1D'
				}
			}

			$('.circle').circleProgress(progressBarOptions).on('circle-animation-progress', function (event, progress, stepValue) {
				$(this).find('strong').text(String(stepValue.toFixed(2)).substr(2) + '%');
			});
		}
			
		
		$scope.calculateCircle = function(){
			var array_circle = [],
					sponsor_val, objective_val, contact_val, info_val, files_val;
			if($rootScope.currentUser.sponsor != null){
				sponsor_val = .20
			} else {
				sponsor_val = 0
			} 
			if($rootScope.currentUser.objective != null){
				objective_val = .20
			} else {
				objective_val = 0
			}
			if($rootScope.currentUser.contact != null){
				contact_val = .20
			} else {
				contact_val = 0
			}
			if($rootScope.currentUser.info != null){
				info_val = .20
			} else {
				info_val = 0
			}
			if($rootScope.currentUser.userFiles > 0){
				files_val = .20
			} else {
				files_val = 0
			}
			var final = sponsor_val + objective_val + contact_val + info_val + files_val;
			console.log("final", final);
			$scope.drawCircle(final.toString())
		};
		
		$scope.calculateCircle();


			$http.get('http://api.edu-action.com/api/category/exams')
				.then(function (resp) {
					console.log('EXAMS ', resp);
				}, function (err) {
					console.log(err)
				});
		
			$http.get('http://api.edu-action.com/api/category/directions')
				.then(function (resp) {
					$scope.main_majors = resp.data.data;
				console.log('$scope.main_majors === > ', $scope.main_majors)
				}, function (err) {
					console.log(err)
				});
		
			$http.get('http://api.edu-action.com/api/university')
				.then(function (resp) {
					$scope.main_universities = resp.data.data;
				console.log('$scope.main_universities === > ', $scope.main_universities)
				}, function (err) {
					console.log(err);
				});


			$scope.personal = {};

			$scope.applicationFormSubmitted = false;
			$scope.submit_personal_form = function (valid) {
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
						'Authorization': 'Bearer ' + token
					}
				}).then(function (data) {
					console.log(data);
				}, function (err, status, config, headers) {
					console.log(err, status, config, headers);
				})

				/*	} else {
						console.log("INVALID")
						$scope.applicationFormSubmitted = true;
					}*/
			}

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
				}
			};

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
		
			if ($rootScope.currentUser.objective != null) {
				$scope.objective = $rootScope.currentUser.objective
			} else {

				$scope.objective = {};
				$scope.objective.majors_interested = [];
				$scope.objective.selected_colleges = [];
			}
		
		$scope.submit_objective = function(valid){
			console.log($scope.objective)
		}


		$scope.submitting_uploads = false;
        
        
			$scope.submit_uploads_form = function (transcriptUpload, financialUpload, resumeUpload, essayUpload, toeflUpload, ieltsUpload, passportUploadotherUpload) {
				$scope.submitting_uploads = true;
				console.log(transcriptUpload)
				console.log($("#transcripts").files)
				var dataUpdate = new FormData();
				dataUpdate.append("user_id", $rootScope.currentUser.id)
				//dataUpdate.user_id = $rootScope.currentUser.id;
			//	dataUpdate.file = [];
				//dataUpdate.file.push(transcriptUpload);
				/*for (var key of dataUpdate.entries()) {
					console.log(key[0] + ', ' + key[1]);
				}*/


				var files = $("input[type='file']");
				$.each($("input[type='file']"), function (i, obj) {
					$.each(obj.files, function (j, file) {
						dataUpdate.append('file[' + j + ']', file);
					})
				});
				
				var json_arr = JSON.stringify($scope.uploadsAll);
				
				for (var key in dataUpdate.entries()) {
					console.log(key);
				};
				
				dataUpdate.append("file[]",json_arr);

				console.log(dataUpdate);

				$.ajax({
					url: 'http://api.edu-action.com/api/user/upload-files',
					cache: false,
					contentType: false,
					processData: false,
					data: dataUpdate,
					type: 'POST',
					success: function (response) {
						//console.log('response == >', response);
						console.log(response, "SUCCESSSSSSS");
						$scope.updateCurrentUser();
						$scope.submitting_uploads = false;
						$scope.calculateCircle();
						toaster.pop('success', "Your information Updated successfully");
					},
					error: function (error, a, b, c) {
						console.log(error, a, b, c);
						$ionicLoading.hide();
						$scope.submitting_uploads = false;
					}
				});



				/*$http({
					method: 'POST',
					url: 'http://api.edu-action.com/api/user/upload-files',
					data: dataUpdate,
					//withCredentials: true,
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}).then(function (data) {
					console.log(" UPLOADED ", data);
					
					//	$state.go('home.application.form-objectives');
				}, function (err, status, config, headers) {
					console.log(err, status, config, headers);
				})*/
			};

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

			$scope.removeUpload = function (item) {
				var index = $scope.uploadsAll.indexOf(item);
				$scope.uploadsAll.splice(index, 1);
			}

		});
}());