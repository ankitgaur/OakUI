homeApp
		.controller(
				'entertainmentCtrl',
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
							getFashion();
							getTopSlides();
							
							getTrending();
							
							getLatest();
							
							getSpotlight();
							
							//always last
							render();
							
							function render(){
								setTimeout(function() {									
									util.renderOnReady();
									util.renderOnLoad();																
								}, 1000);
							}
							
							function getTrending() {

								oakHomeFactory
										.getPopularContent('articles','entertainment')
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
															.debug('There is some issue while getting trending from rest service');
												});
							}
							
							function getLatest() {

								oakHomeFactory
										.getContent('articles','entertainment')
										.then(
												function success(response) {

													setTimeout(
															function() {
																$scope
																		.$apply(function() {
																			
																			if(response.results.length > 8){
																				
																				$scope.latest1 = response.results.slice(0,8);
																				
																				if(response.results.length > 16){
																					$scope.latest2 = response.results.slice(8,16);
																					
																					if(response.results.length > 24){
																						$scope.latest3 = response.results.slice(16,24);
																					}
																					else{
																						$scope.latest3 = response.results.slice(16,response.results.length);
																					}
																				}
																				
																				else{
																					$scope.latest2 = response.results.slice(8,response.results.length);
																				}
																			}
																			
																			else{
																				$scope.latest1 = response.results.slice(0,response.results.length);
																				
																			}
																			
																			
																		});
															}, 0);


												},
												function error(response) {
													$log
															.debug('There is some issue while getting trending from rest service');
												});
							}
							
							function getTopSlides() {

								oakHomeFactory
										.getContent('articles','entertainment slider')
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
							
							function getSpotlight() {

								oakHomeFactory
										.getContent('articles','entertainment spotlight')
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
															.debug('There is some issue while getting spotlight from rest service');
												});
							}
							
							function getFashion() {

								oakHomeFactory
										.getContent('articles','entertainment fashion')
										.then(
												function success(response) {

													setTimeout(
															function() {
																$scope
																		.$apply(function() {
																			$scope.fashion = response.results;
																		});
															}, 0);


												},
												function error(response) {
													$log
															.debug('There is some issue while getting fashion from rest service');
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