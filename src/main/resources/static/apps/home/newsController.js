homeApp
		.controller(
				'newsCtrl',
				[
						'$scope',
						'$rootScope',
						'$http',
						'$log',
						'oakHomeFactory',
						'userFactory',
						function($scope, $rootScope, $http, $log,
								oakHomeFactory, userFactory) {

							$scope.api_url= AppConfig.appUrl;
							
							checkLogin();
							setDate();
							setLocation();
							getLastRumors();
							getTopSlides();
							
							getLatest();
							getTrending();
							
							getCategory1();
							getCategory2();
							getCategory3();
							
							//always last
							render();
							
							function getCategory1() {
								
								$scope.cat1 = { title : "Headlines" };
								
								oakHomeFactory.getContent('articles','news headlines')
										.then(
												function success(response) {

													setTimeout(
															function() {
																$scope
																		.$apply(function() {
																			$scope.cat1.top = response.results[0];
																			$scope.cat1.arr = response.results.slice(1,4);
																		});
															}, 0);

												},
												function error(response) {
													$log
															.debug('There is some issue while getting category1 from rest service');
												});

							}
							
							function getCategory2() {
								
								$scope.cat2 = { title : "Business" };
								
								oakHomeFactory.getContent('articles','news business')
										.then(
												function success(response) {

													setTimeout(
															function() {
																$scope
																		.$apply(function() {
																			$scope.cat2.top = response.results[0];
																			$scope.cat2.arr = response.results.slice(1,4);
																		});
															}, 0);

												},
												function error(response) {
													$log
															.debug('There is some issue while getting category1 from rest service');
												});

							}
							
							function getCategory3() {
								
								$scope.cat3 = { title : "Sports" };
								
								oakHomeFactory.getContent('articles','news sports')
										.then(
												function success(response) {

													setTimeout(
															function() {
																$scope
																		.$apply(function() {
																			$scope.cat3.top = response.results[0];
																			$scope.cat3.arr = response.results.slice(1,4);
																		});
															}, 0);

												},
												function error(response) {
													$log
															.debug('There is some issue while getting category1 from rest service');
												});

							}
							
							function getLastRumors() {
								oakHomeFactory.getContent('articles','news ticker')
										.then(
												function success(response) {

													setTimeout(
															function() {
																$scope
																		.$apply(function() {
																			$scope.rumors = response.results;
																		});
															}, 0);

												},
												function error(response) {
													$log
															.debug('There is some issue while getting rumors from rest service');
												});

							}
							
							function getTopSlides() {

								oakHomeFactory
										.getContent('articles','news slider')
										.then(
												function success(response) {

													setTimeout(
															function() {
																$scope
																		.$apply(function() {
																			$scope.topslides = response.results;
																		});
															}, 0);


												},
												function error(response) {
													$log
															.debug('There is some issue while getting topslides from rest service');
												});
							}
							
							function getLatest(){
								
								oakHomeFactory
								.getContent("articles","news")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	$scope.latest = response.results;
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
								
							}
							
							function getTrending(){	
								oakHomeFactory
								.getPopularContent("articles","news")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	$scope.trending = response.results;
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
							}
							
							function render(){
								setTimeout(function() {									
									util.renderOnReady();
									util.renderOnLoad();																
								}, 1000);
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
																				
																				for (i = 0, len = response.groups.length; i < len; i++) { 
																				    if(response.groups[i].search("admin") >= 0){
																				    	$scope.admin = true;
																				    }
																				    
																				    if(response.groups[i].search("author") >= 0){
																				    	$scope.author = true;
																				    }
																				}
																				
																			});
																}, 0);

													},
													function error(response) {
														$log
																.debug('There is some issue while getting usr from rest service');
													});
								}
							}

							function setDate() {

								day = "";
								month = "";

								d = new Date();
								$scope.day = d.getDate();

								day = util.getDayOfTheWeek(d.getDay());
								month = util.getMonth(d.getMonth());

								$scope.monthday = month + ", " + day;

							}

							function setLocation() {

								$scope.temprature = "33˚C";
								var requestUrl = "http://ip-api.com/json";
								$.ajax({
									url : requestUrl,
									type : 'GET',
									success : function(json) {

										setTimeout(function() {
											$scope.$apply(function() {
												$scope.cityregion = json.city
														+ ", " + json.region;
											});
										}, 0);

									},
									error : function(err) {
										console.log("Request failed, error= "
												+ err);
									}
								});

							}
							
							
							/*
							 * $scope.showTable = function() {
							 * $('#the-table').show(); $('#the-chart').hide(); };
							 */

						} ]);