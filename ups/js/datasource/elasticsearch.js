var module = angular.module('ups');

module.factory('ElasticSearchDatasource',
		function($http, $timeout) {

			function ElasticSearchDatasource() {
			}

			ElasticSearchDatasource.url = "http://10.208.83.199:9200/";
			ElasticSearchDatasource.index = "ups/employee/";

			ElasticSearchDatasource.searchAllEmployee = function(context) {
				console.log('searchAllEmployee');
				$http.get(
						ElasticSearchDatasource.url
								+ ElasticSearchDatasource.index + "_search")
						.success(function(data, status, headers, config) {
							context.employees = data.hits.hits;
						});
			};

			ElasticSearchDatasource.saveEmployee = function(context, employee,
					id) {
				console.log('saveEmployee id:' + id);
				console.log(employee);
				$http.post(
						ElasticSearchDatasource.url
								+ ElasticSearchDatasource.index
								+ (id ? id : ''), employee).then(
						$timeout(function() {
							ElasticSearchDatasource.searchAllEmployee(context);
						}, 3000))
			};

			ElasticSearchDatasource.searchEmployeeBySkill = function(context,
					skillName) {
				console.log('searchEmployeeBySkill ' + skillName);
				$http.get(
						ElasticSearchDatasource.url
								+ ElasticSearchDatasource.index
								+ "_search?q=knowledgeBase.advanced:*"
								+ skillName + "*").success(
						function(data, status, headers, config) {
							console.log(skillName);
							context.employees = data.hits.hits;
							console.log(context.employees);
						});
			};

			ElasticSearchDatasource.searchAllSkills = function(context) {
				var requestBody = {"aggregations":{"skills":{"terms":{"field":"knowledgeBase.advanced"}}}};
				console.log('searchAllSkills');
				$http.post(
						ElasticSearchDatasource.url
								+ ElasticSearchDatasource.index
								+ "_search?_search?search_type=count", requestBody).success(
						function(data, status, headers, config) {
							context.allSkills = data.aggregations.skills.buckets;
							console.log(context.allSkills)
						});
			};

			return ElasticSearchDatasource;
		});