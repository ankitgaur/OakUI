homeApp
		.controller(
				'blogCtrl',
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
							getMyBlogs();
							getBlogs();
							getTrending();
							getLatest();
							getSlider();
							//always last
							render();
							
							$scope.api_url = AppConfig.appUrl;
							$scope.preDefTags = [ 'slider',
													'portfolio' ];
							
							function render(){
								setTimeout(function() {									
									util.renderOnReady();
									util.renderOnLoad();																
								}, 2000);
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
							
							function getSlider(){
								oakHomeFactory
								.getContent("blog_posts","slider")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	$scope.slides = response.results;
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
								.getPopularContent("blog_posts","")
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
								.getContent("blog_posts","")
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
							
							function getBlogs(){
								oakHomeFactory
								.getContent("blogs","")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	$scope.blogs = response.results;
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
							}
							
							function getMyBlogs(){
								oakHomeFactory
								.getContent("blogs","")
								.then(
										function success(response) {

											setTimeout(
													function() {
														$scope
																.$apply(function() {
																	$scope.myblogs = response.results;
																});
													}, 0);

										},
										function error(response) {
											$log
													.debug('There is some issue while getting latest articles from rest service');
										});
							}
							
							$scope.createBlog = function(blog) {

								var file = $("#displayImage").get(0).files[0];
								var bdata = new FormData();

								bdata.append('content_type', 'blogs');
								//bdata.append('tags', 'blogs');
								bdata.append('title', blog.title);
								bdata.append('content', blog.intro);
								bdata.append('displayImage', file);

								oakHomeFactory
										.createContent(bdata)
										.then(
												function success(response) {

													alert("New Blog was created. Stay on this page to create another Blog or click close to go back.");
													clearBlogForm(blog);

												},
												function error(response) {
													$log
															.debug('There is some issue while creating  Blog ');
												});
							}
							
							$scope.resetBlogForm = function(blog){
								clearBlogForm(blog);
							}
							
							function clearBlogForm(blog) {
								blog.intro = null;
								blog.tags = null;
								blog.title = null;
								$("#displayImage").val('');

							}
							
							$scope.createBlogPost = function(blog) {

								tmp = blog.blog.split('|');
								
								var file = $("#displayImage").get(0).files[0];
								var bdata = new FormData();

								bdata.append('content_type', 'blog_posts');
								
								bdata.append('parent_id',tmp[0]);
								bdata.append('parent_name',tmp[1]);
								
								bdata.append('tags', blog.tags);
								bdata.append('title', blog.title);
								bdata.append('intro', blog.intro);
								bdata.append('displayImage', file);
								bdata.append('content',
										CKEDITOR.instances.editor1.getData());

								oakHomeFactory
										.createContent(bdata)
										.then(
												function success(response) {

													alert("New Blog Post was created. Stay on this page to create another Blog Post or click close to go back.");
													clearBlogPostForm(blog);

												},
												function error(response) {
													$log
															.debug('There is some issue while creating  Blog ');
												});
							}
							
							function clearBlogPostForm(blog) {
								blog.blog = null;
								blog.intro = null;
								blog.tags = null;
								blog.title = null;
								CKEDITOR.instances.editor1.setData('');
								$("#displayImage").val('');

							}
							
							$scope.resetBlogPostForm = function(blog){
								clearBlogPostForm(blog);
							}
							
							$scope.addTags = function(tag) {

								blog = $scope.blog;

								if (blog == null) {
									$scope.blog = {
										tags : ""
									};
									blog = $scope.blog;
								}

								if (blog.tags == null) {
									blog.tags = "";
								}

								if (blog.tags.search(tag) < 0) {
									blog.tags = blog.tags + " " + tag;
								}

							}
							
							
							/*
							 * $scope.showTable = function() {
							 * $('#the-table').show(); $('#the-chart').hide(); };
							 */

						} ]);