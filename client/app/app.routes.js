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
				.state('home.privacy_policy', {
					url: '/privacy-policy',
					templateUrl: 'client/app/components/home/privacy-policy.html'
				})
				.state('home.term_of_services', {
					url: '/terms-of-services',
					templateUrl: 'client/app/components/home/terms-of-services.html'
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
				.state('home.sg', {
					url: '/study-in-sg',
					templateUrl: 'client/app/components/college/study-sg.html',
					controller: 'collegeController'
				})
				.state('home.kr', {
					url: '/study-in-kr',
					templateUrl: 'client/app/components/college/study-kr.html',
					controller: 'collegeController'
				})
				.state('home.au', {
					url: '/study-in-au',
					templateUrl: 'client/app/components/college/study-au.html',
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
					templateUrl: 'client/app/components/application/application-overall.html'
				})
				.state('home.application.college-status', {
					url: '/college-status',
					templateUrl: 'client/app/components/application/application-college-status.html'
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