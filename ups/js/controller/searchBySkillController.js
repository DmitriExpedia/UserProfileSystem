angular.module('ups').controller(
		'searchBySkillController',
		[
				'$scope',
				'$location',
				'ElasticSearchDatasource',
				function($scope, $location, ElasticSearchDatasource) {
					$scope.datasource = ElasticSearchDatasource;
					$scope.employees = [];
					$scope.readOnly = true;
					$scope.requiredSkill = $location.search().requiredSkill;

					$scope.searchEmployeeBySkill = function() {
						$scope.datasource.searchEmployeeBySkill($scope,
								$scope.requiredSkill)
					}
					
					if ($scope.requiredSkill) {
						$scope.searchEmployeeBySkill();
					}

				} ]);