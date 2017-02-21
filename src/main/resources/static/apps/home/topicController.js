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
							
							
							getMyTopics();
							
							$scope.api_url = AppConfig.appUrl;
							
							if (window.location.hash != null
									&& window.location.hash != '') {

								id = window.location.hash;

								getTopic(id);
								getReplies(id);
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
							
							function getReplies(id){
								oakHomeFactory
								.getContentForParent("replies",id.trim().replace("#/", ""))
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {

																	$scope.replies = response.results;

																});
													}, 10);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting topic from rest service');
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
																	$scope.parentid = $scope.topic.id;
																	$scope.parentname = $scope.topic.name;

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
							
							$scope.createReply = function(replyobj) {

								var bdata = new FormData();

								bdata.append('content_type', 'replies');
								bdata.append('title', 'Reply to topic : '+ $scope.parentname);
								bdata.append('content',replyobj.description);
								bdata.append('parent_id', $scope.parentid);
								bdata.append('parent_name', $scope.parentname);

								oakHomeFactory
										.createContent(bdata)
										.then(
												function success(response) {

													alert("Your reply was uploaded. ");
													clearForm(replyobj);
													getReplies($scope.parentid);

												},
												function error(response) {
													$log
															.debug('There is some issue while creating  reply ');
												});
							}
							
							function clearForm(replyobj) {
								replyobj.description = null;
							}
							
							/*
							 * $scope.showTable = function() {
							 * $('#the-table').show(); $('#the-chart').hide(); };
							 */

						} ]);