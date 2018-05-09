(function () {
	'use strict';

	angular.module('eduAction')
		.controller('home', function ($scope, $rootScope, $state, $transitions, $localstorage, $window, $http) {


		/*	var progressBarOptions = {
				startAngle: -1.55,
				size: 100,
				value: 0.55,
				fill: {
					color: 'green'
				}
			}

			$('.circle').circleProgress(progressBarOptions).on('circle-animation-progress', function (event, progress, stepValue) {
				$(this).find('strong').text(String(stepValue.toFixed(2)).substr(2) + '%');
			});*/

		/*console.log($('.circle').html())
			$('#circle-b').circleProgress({
				value: 0.25,
				size: 50,
				fill: {
					color: '#FF0000'
				}
			}).on('circle-animation-progress', function (event, progress, stepValue) {
				$(this).find('strong').text(String(stepValue.toFixed(2)).substr(2) + '%');
			});*/
		/*$('#circle-b').circleProgress(progressBarOptions).on('circle-animation-progress', function (event, progress, stepValue) {
				$(this).find('strong').text(String(stepValue.toFixed(2)).substr(2) + '%');
			});*/

			/*$scope.isAuth = function(){
				console.log($localstorage.get('access_token'))
			}*/

			$scope.options = {
				minDate: new Date(),
				showWeeks: true
			};

			$scope.isAuth = function () {
				if ($localstorage.get('access_token') != undefined) {
					return true
				} else {
					return false
				}
			};

			if ($rootScope.currentUser == undefined) {
				$rootScope.currentUser = $localstorage.getObject('currentUser');
			}

			$scope.updateCurrentUser = function () {
				if ($scope.isAuth()) {
					$http.get('http://api.edu-action.com/api/user/profile?id=' + $rootScope.currentUser.id)
						.then(function (resp) {
							//	console.log(resp.data);
							$rootScope.currentUser = resp.data
							$localstorage.setObject('currentUser', $rootScope.currentUser);
						}, function (err) {
							console.log(err)
						});
				} else {
					console.log("Not a user")
				}

			};

			$scope.updateCurrentUser()


			console.log($scope.isAuth())

			$rootScope.signOut = function () {
				localStorage.removeItem('access_token');
				localStorage.removeItem('currentUser');
				$rootScope.currentUser = {};
				$window.location.reload();
			}

			$rootScope.go_apply_college = function () {
				if ($scope.isAuth()) {
					$state.go("home.application.overall")
				} else {
					$rootScope.go_signup();
				}
			}

			$rootScope.go_signup = function () {
				$state.go('login', {
					isLogin: true
				});
			}
			$rootScope.go_login = function () {
				$state.go('login', {
					isLogin: false
				});
			}

			$rootScope.go_application = function () {
				$state.go('home.application.overall');
			}

			$transitions.onSuccess({}, function () {
				console.log($state.current.name);
				$(window).scrollTop(0);
				return false;
				if ($state.current.name == 'home') {
					$state.go('home.main');
				}
			});

			$http.get('http://api.edu-action.com/api/category/countries')
				.then(function (resp) {
					$scope.countries_of_study = resp.data.data;
					//console.log('Countrues ', $scope.countries_of_study);
				}, function (err) {
					console.log(err)
				});

			$http.get('http://api.edu-action.com/api/category/directions')
				.then(function (resp) {
					$scope.majors_of_study = resp.data.data;

				//	console.log('Majors ', $scope.majors_of_study);
				}, function (err) {
					console.log(err)
				});
			$http.get('http://api.edu-action.com/api/university')
				.then(function (resp) {
					$scope.universities_of_study = resp.data.data;

					//console.log('universities_of_study ', $scope.universities_of_study);
				}, function (err) {
					console.log(err)
				});

			$scope.stripAddr = function (address) {
				return address.replace("&amp;", "&");
			}




		});

}());






/*$('.card-wrapper').slick({
				dots: true,
				adaptiveHeight: true,
				infinite: true,
				speed: 300,
				dots: false,
				variableWidth: true,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 6,
							slidesToScroll: 2,
							infinite: true,
							dots: false
						}
    				},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
    				},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
			});

			$('.countries-of-study-wrapper').slick({
				dots: true,
				adaptiveHeight: true,
				infinite: true,
				speed: 300,
				dots: false,
				variableWidth: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				responsive: [
					{
						breakpoint: 1024,
						settings: {
							slidesToShow: 5,
							slidesToScroll: 2,
							infinite: true,
							dots: false
						}
    				},
					{
						breakpoint: 600,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
    				},
					{
						breakpoint: 480,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
			});*/