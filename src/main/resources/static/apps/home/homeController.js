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

							checkLogin();
							setDate();
							setLocation();
							getTopSlides();
							getLastRumors();
							getLatest();
							getTrending();
							
							function getTrending(){
								
								$('.parallax-columns-container').parallaxColumn();
								setTimeout(function() {
									$('.parallax-columns-container').parallaxColumn();
								}, 100);
								
							}
							
							function getLatest(){
								
								oakHomeFactory
								.getArticlesByLimit(10)
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	$scope.latest = response;
																});
													}, 0);

											setTimeout(function() {
												$('.parallax-columns-container').parallaxColumn();
											}, 100);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
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

							function getLastRumors() {
								oakHomeFactory
										.getPlacement('home_rumors')
										.then(
												function success(response) {

													setTimeout(
															function() {
																$scope
																		.$apply(function() {
																			$scope.rumors = response;
																		});
															}, 0);

													setTimeout(function() {
														util.renderLastRumor();
													}, 100);

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
										.getPlacement('home_topslider')
										.then(
												function success(response) {

													setTimeout(
															function() {
																$scope
																		.$apply(function() {
																			$scope.topslides = response;
																		});
															}, 0);

													setTimeout(
															function() {
																util
																		.renderNewsSlider();
															}, 100);

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