homeApp
		.controller(
				'homeCtrl',
				[
						'$scope',
						'$rootScope',
						'$http',
						'$log',
						'oakHomeFactory',
						function($scope, $rootScope, $http, $log,
								oakHomeFactory) {

							setDate();
							setUser();
							setLocation();
							getTopSlides();
							getLastRumors();

							function getLastRumors(){
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

											setTimeout(
													function() {
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

							function setUser() {
								$scope.user = "Richard";
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
																util.renderNewsSlider();
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