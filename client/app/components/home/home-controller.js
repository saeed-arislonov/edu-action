(function () {
	'use strict';

	angular.module('eduAction')
		.controller('home', function ($scope, $rootScope, $state, $transitions, $localstorage, $window) {

		
		/*$scope.isAuth = function(){
			console.log($localstorage.get('access_token'))
		}*/
		
			$scope.isAuth = function(){
			if($localstorage.get('access_token') != undefined){
				return true
			} else {
				return false
			}
		}
		
		console.log($scope.isAuth())
		
		$rootScope.signOut = function(){
			localStorage.removeItem('access_token');
			$window.location.reload();
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
				console.log('adasdasd')
				$state.go('home.application.overall');
			}

			$transitions.onSuccess({}, function () {
				console.log($state.current.name)
				if($state.current.name == 'home') {
					$state.go('home.main');
				}
			});

			


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