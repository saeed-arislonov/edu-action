(function () {
	'use strict';

	angular.module('eduAction')
		.config(function ($stateProvider, $urlRouterProvider) {
			$stateProvider
				.state('login', {
					url: '/login',
					params: {
						isLogin: null
					},
					templateUrl: 'client/app/components/login/login-view.html',
					controller: 'login'
				})
				.state('home', {
					url: '/home',
					templateUrl: 'client/app/components/home/home-main.html',
					controller: 'home'
				})
				.state('home.main', {
					url: '/main',
					templateUrl: 'client/app/components/home/home-view.html',
					controller: 'main-controller'
				})
				.state('home.usa', {
					url: '/study-in-usa',
					templateUrl: 'client/app/components/college/study-usa.html',
					controller: 'collegeController'
				})
				.state('home.uk', {
					url: '/study-in-uk',
					templateUrl: 'client/app/components/college/study-uk.html',
					controller: 'collegeController'
				})
				.state('home.my', {
					url: '/study-in-my',
					templateUrl: 'client/app/components/college/study-my.html',
					controller: 'collegeController'
				})
				.state('home.colleges', {
					url: '/college-search',
					templateUrl: 'client/app/components/college/college-view.html',
					controller: 'collegeController'
				})
				.state('home.application', {
					url: '/application',
					templateUrl: 'client/app/components/application/application-view.html',
					controller: 'application',
					//redirectTo: 'application.overall',
				})
				.state('home.application.overall', {
					url: '/overall',
					templateUrl: 'client/app/components/application/application-overall.html',
					controller: 'application',
				})
				.state('home.application.form-personal', {
					url: '/personal',
					templateUrl: 'client/app/components/application/application-form-personal.html',
				})
				.state('home.application.form-contact', {
					url: '/contact',
					templateUrl: 'client/app/components/application/application-form-contact.html',
				})
				.state('home.application.form-objectives', {
					url: '/objectives', 
					templateUrl: 'client/app/components/application/application-form-objectives.html',
				})
				.state('home.application.form-sponsors', {
					url: '/sponsors',
					templateUrl: 'client/app/components/application/application-form-sponsors.html',
				})
				.state('home.application.form-uploads', {
					url: '/uploads',
					templateUrl: 'client/app/components/application/application-form-uploads.html',
				});
			$urlRouterProvider.otherwise('/home/main');
		});

}());