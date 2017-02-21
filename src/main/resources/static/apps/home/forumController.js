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
							
							getMyTopics();
							
							$scope.api_url = AppConfig.appUrl;
							
							$scope.api_url = AppConfig.appUrl;
							
							if (window.location.hash != null
									&& window.location.hash != '') {

								id = window.location.hash;

								getTopicsWID(id);

							}
							else{
								getTopics();
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
							
							function getTopicsWID(id){
								oakHomeFactory
								.getContentForParent("forum_topics",id.trim().replace("#/", ""))
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {

																	$scope.topics = response.results;

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
							
							
							$scope.createTopic = function(topic) {

								if(!topic.category){
									alert("Please select a category");
									return;
								}
								
								var bdata = new FormData();
								
								bdata.append('content_type', 'forum_topics');
								bdata.append('title', topic.title);
								bdata.append('content',topic.content);
								
								arr = topic.category.split("|");
								
								parentid = arr[0];
								parentname = arr[1];
								
								bdata.append('parent_id', parentid);
								bdata.append('parent_name', parentname);

								oakHomeFactory
										.createContent(bdata)
										.then(
												function success(response) {

													alert("Your topic was uploaded. ");
													clearForm(topic);
													getTopics();

												},
												function error(response) {
													$log
															.debug('There is some issue while creating  reply ');
												});
							}
							
							function clearForm(topic) {
								topic.content = null;
								topic.title = null;
								topic.category = null;
							}
							
							
							/*
							 * $scope.showTable = function() {
							 * $('#the-table').show(); $('#the-chart').hide(); };
							 */

						} ]);