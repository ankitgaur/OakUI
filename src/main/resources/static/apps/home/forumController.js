homeApp
		.controller(
				'forumCtrl',
				[
						'$scope',
						'$rootScope',
						'$http',
						'$log',
						'oakHomeFactory',
						'userFactory',
						function($scope, $rootScope, $http, $log,
								oakHomeFactory, userFactory) {

							checkLogin();
							getCategories();
							getTopics();
							getMyTopics();
							
							$scope.api_url = AppConfig.appUrl;
							

							function checkLogin() {
								jwt = util.getCookie("jwt");
								if (jwt != "") {

									userFactory
											.whoami(jwt)
											.then(
													function success(response) {

														setTimeout(
																function() {
																	$scope
																			.$apply(function() {
																				$scope.user = response;
																			});
																}, 0);

													},
													function error(response) {
														$log
																.debug('There is some issue while getting usr from rest service');
													});
								}
							}
							
							function getCategories(){
								oakHomeFactory
								.getContent("forum_categories","")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	$scope.categories = response.results;
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest categories from rest service');
										});
							}
							
							function getTopics(){
								oakHomeFactory
								.getContent("forum_topics","")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	$scope.topics = response.results;
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest topics from rest service');
										});
							}
							
							function getMyTopics(){
								
							}
							
							
							
							/*
							 * $scope.showTable = function() {
							 * $('#the-table').show(); $('#the-chart').hide(); };
							 */

						} ]);