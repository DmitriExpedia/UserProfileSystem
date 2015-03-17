angular.module('ups').controller(
		'searchAllSkillsController',
		[
				'$scope',
				'ElasticSearchDatasource',
				function($scope, ElasticSearchDatasource) {
					$scope.datasource = ElasticSearchDatasource;
					$scope.readOnly = true;
					$scope.allSkills = []

					$scope.searchAllSkills = function() {
						$scope.datasource.searchAllSkills($scope)
					}

					$scope.calculateAllSkillsReportedCounts = function() {
						var total = 0;
						for (var i = 0; i < $scope.allSkills.length; i++) {
							total += $scope.allSkills[i].doc_count;
						}
						return total;
					}

					$scope.calculateSkillFontSize = function(skillCount) {
						//returns 1 - for common skill, 2 - less common
						if (skillCount > Math.round($scope
								.calculateAllSkillsReportedCounts()
								/ $scope.allSkills.length)) {
							return '30px';
						} else {
							return '15px';
						}
					}

					$scope.searchAllSkills();
				} ]);