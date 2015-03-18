angular
		.module('ups')
		.controller(
				'employeesController',
				[
						'$scope',
						'$http',
						'$timeout',
						'ElasticSearchDatasource',
						function($scope, $http, $timeout,
								ElasticSearchDatasource) {

							$scope.datasource = ElasticSearchDatasource;
							$scope.employeePage = true;

							$scope.searchAllEmployee = function() {
								$scope.datasource.searchAllEmployee($scope);
							}

							$scope.reset = function() {
								$scope.firstName = '';
								$scope.lastName = '';
								$scope.email = '';
								$scope.phone = '';
								$scope.employeeId = '';
								$scope.skills = [];
							}

							$scope.edit = false;
							$scope.knowledgeCollapsed = true;

							$scope.editEmployee = function(id) {
								$scope.edit = true;

								for (var i = 0; i < $scope.employees.length; i++) {
									var employee = $scope.employees[i];
									if (angular.equals(employee._id, id)) {
										$scope.firstName = employee._source.firstName;
										$scope.lastName = employee._source.lastName;
										$scope.email = employee._source.email;
										$scope.phone = employee._source.phone;
										$scope.skills = employee._source.knowledgeBase.advanced;
										$scope.employeeId = employee._id;
									}
								}

							};

							$scope.expandKnowledge = function(id) {
								for (var i = 0; i < $scope.employees.length; i++) {
									var employee = $scope.employees[i];
									if (angular.equals(employee._id, id)) {
										console
												.log(employee._source.knowledgeBase);
										var skills = employee._source.knowledgeBase.advanced;
										var skillsList = '<ul>'
										for (var j = 0; j < skills.length; j++) {
											skillsList += '<li>' + skills[j]
													+ '</li>';
										}
										skillsList += '</ul>';
										$scope.skillsList = skillsList;
										$scope.showModal = true;
									}
								}

							};

							$scope.addSkill = function() {
								if (!$scope.skills) {
									$scope.skills = [];
								}
								$scope.skills.push($scope.newSkill);
								$scope.newSkill = null;
							};

							$scope.removeSkill = function(skill) {
								var index = $scope.skills.indexOf(skill);
								$scope.skills.splice(index, 1);
							};

							$scope.saveEmployee = function() {
								var employee = {};
								employee.firstName = $scope.firstName;
								employee.lastName = $scope.lastName;
								employee.email = $scope.email;
								employee.phone = $scope.phone;
								employee.knowledgeBase = {};
								employee.knowledgeBase.advanced = $scope.skills;

								$scope.datasource.saveEmployee($scope,
										employee, $scope.employeeId);
								$scope.reset();
							};

							$scope.reset();
							$scope.searchAllEmployee();
							$scope.showModal = false;

						} ]);