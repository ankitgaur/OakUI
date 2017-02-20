homeApp
		.controller(
				'topicCtrl',
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
							
							getReplies();
							getMyTopics();
							
							$scope.api_url = AppConfig.appUrl;
							
							if (window.location.hash != null
									&& window.location.hash != '') {

								id = window.location.hash;

								getTopic(id);

							}

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
							
							function getReplies(){
								oakHomeFactory
								.getContent("forum_topics","")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	$scope.replies = response.results;
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest topics from rest service');
										});
							}
							
							function getTopic(id){
								oakHomeFactory
								.getContentById(
										id.trim().replace("#/", ""))
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {

																	$scope.topic = response.results[0];

																});
													}, 10);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting topic from rest service');
										});
							}
							
							function getMyTopics(){
								
							}
							
							
							
							/*
							 * $scope.showTable = function() {
							 * $('#the-table').show(); $('#the-chart').hide(); };
							 */

						} ]);