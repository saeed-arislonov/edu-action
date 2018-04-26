/*(function () {
	'use strict';
	angular.module('eduAction').directive("fileModelTranscript", function () {
			return {
				restrict: 'EA',
				scope: {
					setFileDataTranscript: "&"
				},
				link: function (scope, ele, attrs) {
					ele.on('change', function () {
						 console.log(attrs.id)
						scope.$apply(function () {
							var val = ele[0].files[0];
						//	 console.log(val) 
							scope.setFileDataTranscript({
								value: val,
								id: attrs.id
							});
						});
					});
				}
			}
		}).directive("fileModelFinancial", function () {
			return {
				restrict: 'EA',
				scope: {
					setFileDataFinancial: "&"
				}, 
				link: function (scope, ele, attrs) {
					ele.on('change', function () {
						 console.log(attrs.id)
						scope.$apply(function () {
							var val = ele[0].files[0];
						//	 console.log(val)
							scope.setFileDataFinancial({
								value: val,
								id: attrs.id
							});
						});
					});
				}
			}
		}).directive("fileModelResume", function () {
			return {
				restrict: 'EA',
				scope: {
					setFileDataResume: "&"
				},
				link: function (scope, ele, attrs) {
					ele.on('change', function () {
						 console.log(attrs.id)
						scope.$apply(function () {
							var val = ele[0].files[0];
						//	 console.log(val)
							scope.setFileDataResume({
								value: val,
								id: attrs.id
							});
						});
					});
				}
			}
		}).directive("fileModelEssay", function () {
			return {
				restrict: 'EA',
				scope: {
					setFileDataEssay: "&"
				},
				link: function (scope, ele, attrs) {
					ele.on('change', function () {
						 console.log(attrs.id)
						scope.$apply(function () {
							var val = ele[0].files[0];
						//	 console.log(val)
							scope.setFileDataEssay({
								value: val,
								id: attrs.id
							});
						});
					});
				}
			}
		}).directive("fileModelToefl", function () {
			return {
				restrict: 'EA',
				scope: {
					setFileDataToefl: "&"
				},
				link: function (scope, ele, attrs) {
					ele.on('change', function () {
						 console.log(attrs.id)
						scope.$apply(function () {
							var val = ele[0].files[0];
						//	 console.log(val)
							scope.setFileDataToefl({
								value: val,
								id: attrs.id
							});
						});
					});
				}
			}
		}).directive("fileModelIelts", function () {
			return {
				restrict: 'EA',
				scope: {
					setFileDataIelts: "&"
				},
				link: function (scope, ele, attrs) {
					ele.on('change', function () {
						 console.log(attrs.id)
						scope.$apply(function () {
							var val = ele[0].files[0];
						//	 console.log(val)
							scope.setFileDataIelts({
								value: val,
								id: attrs.id
							});
						});
					});
				}
			}
		}).directive("fileModelPassport", function () {
			return {
				restrict: 'EA',
				scope: {
					setFileDataPassport: "&"
				},
				link: function (scope, ele, attrs) {
					ele.on('change', function () {
						 console.log(attrs.id)
						scope.$apply(function () {
							var val = ele[0].files[0];
						//	 console.log(val)
							scope.setFileDataPassport({
								value: val,
								id: attrs.id
							});
						});
					});
				}
			}
		}).directive("fileModelOther", function () {
			return {
				restrict: 'EA',
				scope: {
					setFileDataOther: "&"
				},
				link: function (scope, ele, attrs) {
					ele.on('change', function () {
						 console.log(attrs.id)
						scope.$apply(function () {
							var val = ele[0].files[0];
						//	 console.log(val)
							scope.setFileDataOther({
								value: val,
								id: attrs.id
							});
						});
					});
				}
			}
		})
}());*/