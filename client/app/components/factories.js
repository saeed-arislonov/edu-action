(function () {
	'use strict';
	angular.module('eduAction').service("application_datas", function () {
			this.countries = [{
					"name": "Western Sahara",
					"code": "EH"
			}, {
					"name": "Yemen",
					"code": "YE"
			},
				{
					"name": "Zambia",
					"code": "ZM"
			}, {
					"name": "Zimbabwe",
					"code": "ZW"
			},
				{
					"name": "Uzbekistan",
					"code": "UZ"
			}, {
					"name": "Malaysia",
					"code": "MY"
			}];
			this.spokenLanguages = [{
				"title": "Uzbek"
			}, {
				"title": "Russian"
			}, {
				"title": "English"
			}, {
				"title": "Tajik"
			}, {
				"title": "Mongolian"
			}];
			this.booleans = [{
				"title": "Yes",
				"code": "1"
			}, {
				"title": "No",
				"code": "0"
			}];
			this.degreeApplying = [{
					"title": "Certificate"
			}, {
					"title": "Associatess"
			}, {
					"title": "Bachelor`s"
			},
				{
					"title": "Master`s"
			}, {
					"title": "Doctorate"
			}];
			this.currentDegree = [{
				"title": "High School"
		}, {
				"title": "College"
		}];
			this.years = ["2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030"];
			this.genders = [{
				"title": "Male"
		}, {
				"title": "Female"
		}];
		}).factory('optionParser', ['$parse', function ($parse) {

			//                      00000111000000000000022200000000000000003333333333333330000000000044000
			var TYPEAHEAD_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?\s+for\s+(?:([\$\w][\$\w\d]*))\s+in\s+(.*)$/;

			return {
				parse: function (input) {

					var match = input.match(TYPEAHEAD_REGEXP),
						modelMapper, viewMapper, source;
					if (!match) {
						throw new Error(
							"Expected typeahead specification in form of '_modelValue_ (as _label_)? for _item_ in _collection_'" +
							" but got '" + input + "'.");
					}

					return {
						itemName: match[3],
						source: $parse(match[4]),
						viewMapper: $parse(match[2] || match[1]),
						modelMapper: $parse(match[1])
					};
				}
			};
  }])

		.directive('multiselect', ['$parse', '$document', '$compile', 'optionParser',

    function ($parse, $document, $compile, optionParser) {
				return {
					restrict: 'E',
					require: 'ngModel',
					link: function (originalScope, element, attrs, modelCtrl) {

						var exp = attrs.options,
							parsedResult = optionParser.parse(exp),
							isMultiple = attrs.multiple ? true : false,
							required = false,
							scope = originalScope.$new(),
							changeHandler = attrs.change || anguler.noop;

						scope.items = [];
						scope.header = 'Select';
						scope.multiple = isMultiple;
						scope.disabled = false;

						originalScope.$on('$destroy', function () {
							scope.$destroy();
						});

						var popUpEl = angular.element('<multiselect-popup></multiselect-popup>');

						//required validator
						if (attrs.required || attrs.ngRequired) {
							required = true;
						}
						attrs.$observe('required', function (newVal) {
							required = newVal;
						});

						//watch disabled state
						scope.$watch(function () {
							return $parse(attrs.disabled)(originalScope);
						}, function (newVal) {
							scope.disabled = newVal;
						});

						//watch single/multiple state for dynamically change single to multiple
						scope.$watch(function () {
							return $parse(attrs.multiple)(originalScope);
						}, function (newVal) {
							isMultiple = newVal || false;
						});

						//watch option changes for options that are populated dynamically
						scope.$watch(function () {
							return parsedResult.source(originalScope);
						}, function (newVal) {
							if (angular.isDefined(newVal))
								parseModel();
						});

						//watch model change
						scope.$watch(function () {
							return modelCtrl.$modelValue;
						}, function (newVal, oldVal) {
							//when directive initialize, newVal usually undefined. Also, if model value already set in the controller
							//for preselected list then we need to mark checked in our scope item. But we don't want to do this every time
							//model changes. We need to do this only if it is done outside directive scope, from controller, for example.
							if (angular.isDefined(newVal)) {
								markChecked(newVal);
								scope.$eval(changeHandler);
							}
							getHeaderText();
							modelCtrl.$setValidity('required', scope.valid());
						}, true);

						function parseModel() {
							scope.items.length = 0;
							var model = parsedResult.source(originalScope);
							for (var i = 0; i < model.length; i++) {
								var local = {};
								local[parsedResult.itemName] = model[i];
								scope.items.push({
									label: parsedResult.viewMapper(local),
									model: model[i],
									checked: false
								});
							}
						}

						parseModel();

						element.append($compile(popUpEl)(scope));

						function getHeaderText() {
							if (!modelCtrl.$modelValue || !modelCtrl.$modelValue.length) return scope.header = 'Select';
							if (isMultiple) {
								scope.header = modelCtrl.$modelValue.length + ' ' + 'selected';
							} else {
								var local = {};
								local[parsedResult.itemName] = modelCtrl.$modelValue;
								scope.header = parsedResult.viewMapper(local);
							}
						}

						scope.valid = function validModel() {
							if (!required) return true;
							var value = modelCtrl.$modelValue;
							return (angular.isArray(value) && value.length > 0) || (!angular.isArray(value) && value != null);
						};

						function selectSingle(item) {
							if (item.checked) {
								scope.uncheckAll();
							} else {
								scope.uncheckAll();
								item.checked = !item.checked;
							}
							setModelValue(false);
						}

						function selectMultiple(item) {
							item.checked = !item.checked;
							setModelValue(true);
						}

						function setModelValue(isMultiple) {
							var value;

							if (isMultiple) {
								value = [];
								angular.forEach(scope.items, function (item) {
									if (item.checked) value.push(item.model);
								})
							} else {
								angular.forEach(scope.items, function (item) {
									if (item.checked) {
										value = item.model;
										return false;
									}
								})
							}
							modelCtrl.$setViewValue(value);
						}

						function markChecked(newVal) {
							if (!angular.isArray(newVal)) {
								angular.forEach(scope.items, function (item) {
									if (angular.equals(item.model, newVal)) {
										item.checked = true;
										return false;
									}
								});
							} else {
								angular.forEach(newVal, function (i) {
									angular.forEach(scope.items, function (item) {
										if (angular.equals(item.model, i)) {
											item.checked = true;
										}
									});
								});
							}
						}

						scope.checkAll = function () {
							if (!isMultiple) return;
							angular.forEach(scope.items, function (item) {
								item.checked = true;
							});
							setModelValue(true);
						};

						scope.uncheckAll = function () {
							angular.forEach(scope.items, function (item) {
								item.checked = false;
							});
							setModelValue(true);
						};

						scope.select = function (item) {
							if (isMultiple === false) {
								selectSingle(item);
								scope.toggleSelect();
							} else {
								selectMultiple(item);
							}
						}
					}
				};
    }])

		.directive('multiselectPopup', ['$document', function ($document) {
			return {
				restrict: 'E',
				scope: false,
				replace: true,
				templateUrl: 'client/app/components/multiselect.html',
				link: function (scope, element, attrs) {

					scope.isVisible = false;

					scope.toggleSelect = function () {
						if (element.hasClass('open')) {
							element.removeClass('open');
							$document.unbind('click', clickHandler);
						} else {
							element.addClass('open');
							scope.focus();
							$document.bind('click', clickHandler);
						}
					};

					function clickHandler(event) {
						if (elementMatchesAnyInArray(event.target, element.find(event.target.tagName)))
							return;
						element.removeClass('open');
						$document.unbind('click', clickHandler);
						scope.$digest();
					}

					scope.focus = function focus() {
						var searchBox = element.find('input')[0];
						searchBox.focus();
					}

					var elementMatchesAnyInArray = function (element, elementArray) {
						for (var i = 0; i < elementArray.length; i++)
							if (element == elementArray[i])
								return true;
						return false;
					}
				}
			}
  }]).directive("fileModel", function () {
			return {
				restrict: 'EA',
				scope: {
					setFileData: "&"
				},
				link: function (scope, ele, attrs) {
					ele.on('change', function () {
						 console.log(attrs.id)
						scope.$apply(function () {
							var val = ele[0].files[0];
						//	 console.log(val)
							scope.setFileData({
								value: val,
								id: attrs.id
							});
						});
					});
				}
			}
		}).directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var onChangeHandler = scope.$eval(attrs.customOnChange);
      element.on('change', onChangeHandler);
      element.on('$destroy', function() {
        element.off();
      });

    }
  };
}).factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);
}());