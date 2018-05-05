(function () {
	'use strict';

	angular.module('eduAction')
		.controller('main-controller', function ($scope, $rootScope, $state, $transitions, $localstorage) {
		
	
		console.log('asdasd')
		
		$rootScope.go_usa = function(){
			$state.go('home.usa')
		};
		$rootScope.go_uk = function(){
			$state.go('home.uk')
		};
		$rootScope.go_my = function(){
			$state.go('home.my')
		};
		$rootScope.go_sg = function(){
			$state.go('home.sg')
		};
		$rootScope.go_au = function(){
			$state.go('home.au')
		};
		
			$('.card-wrapper').slick({
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

		/*	$('.countries-of-study-wrapper').slick({
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


		});

}());