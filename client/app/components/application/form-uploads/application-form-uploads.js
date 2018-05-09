(function () {
	'use strict';

	angular.module('eduAction')
		.controller('formUploads', function ($scope, $rootScope, $state, $transitions, $http, toaster) {
		
			
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
						dataUpdate.append('titles[' + j + ']', $(obj).attr("id"));
					})
				});

				var json_arr = JSON.stringify($scope.uploadsAll);

				for (var key in dataUpdate.entries()) {
					console.log(key);
				};

				dataUpdate.append("file[]", json_arr);

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
