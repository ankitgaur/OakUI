homeApp
		.controller(
				'homeCtrl',
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
							
							//login();
							
							setDate();
							setLocation();
							getTopSlides();
							getLastRumors();
							getLatest();
							getTrending();
							getSpotlight();
							getOpinions();
							getPopularOpinions();
							
							//categories
							getHeadLines();
							getBusiness();
							getSports();
							getEntertainment();
							getFashion();
							getWorld();
							
							// always last
							render();
							function getPopularOpinions(){
								oakHomeFactory
								.getPopularContent("articles","home opinions")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	r = response.results;
																	$scope.trending1 = r.slice(0,5);
																	$scope.trending2 = r.slice(5,10);
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
								
							}
							
							function getHeadLines(){
								oakHomeFactory
								.getContent("articles","headlines")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	r = response.results;
																	$scope.headlines = r.slice(0,3);
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
								
							}
							
							function getBusiness(){
								oakHomeFactory
								.getContent("articles","business")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	r = response.results;
																	$scope.business = r.slice(0,3);
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
								
							}
							
							function getSports(){
								oakHomeFactory
								.getContent("articles","sports")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	r = response.results;
																	$scope.sports = r.slice(0,3);
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
								
							}
							
							function getEntertainment(){
								oakHomeFactory
								.getContent("articles","entertainment")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	r = response.results;
																	$scope.entertainment = r.slice(0,3);
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
								
							}
							
							function getFashion(){
								oakHomeFactory
								.getContent("articles","fashion")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	r = response.results;
																	$scope.fashion = r.slice(0,3);
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
								
							}
							
							function getWorld(){
								oakHomeFactory
								.getContent("articles","world")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	r = response.results;
																	$scope.world = r.slice(0,3);
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
								
							}
							
							function getOpinions(){
								oakHomeFactory
								.getContent("articles","home opinions")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	r = response.results;
																	$scope.opinion = r[0];
																	$scope.opinions = r.slice(1,5);
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
								
							}
							
							function getSpotlight(){
								oakHomeFactory
								.getContent("articles","home spotlight")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	$scope.spotlight = response.results;
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
							
							function getTrending(){	
								oakHomeFactory
								.getPopularContent("articles","")
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
							
							function getLatest(){
								
								oakHomeFactory
								.getContent("articles","")
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

							function login(){
								user = {};
								user.id = "gaur.ankit2007@gmail.com";
								user.password = "test123";
								
								userFactory
								.login(user)
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	util.setCookie("jwt",response.token,1);
																	//location.reload();
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting usr from rest service');
										});
								
								
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

							function getLastRumors() {
								oakHomeFactory.getContent('articles','home ticker')
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

							function setDate() {

								day = "";
								month = "";

								d = new Date();
								$scope.day = d.getDate();

								day = util.getDayOfTheWeek(d.getDay());
								month = util.getMonth(d.getMonth());

								$scope.monthday = month + ", " + day;

							}

							function getTopSlides() {

								oakHomeFactory
										.getContent('articles','home slider')
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