homeApp
		.controller(
				'articleCtrl',
				[
						'$scope',
						'$rootScope',
						'$http',
						'$log',
						'oakHomeFactory',
						'userFactory',
						function($scope, $rootScope, $http, $log,
								oakHomeFactory, userFactory) {

							$scope.api_url = AppConfig.appUrl;

							$scope.preDefTags = [ 'home', 'news', 'slider',
									'entertainment', 'headlines', 'business',
									'sports', 'world', 'spotlight',
									'moviereview', 'fashion', 'nollywood',
									'interview', 'ticker', 'opinions' ];

							checkLogin();

							// always last
							render();

							function render() {
								setTimeout(function() {
									util.renderOnReady();
									util.renderOnLoad();
								}, 1000);
							}

							if (window.location.hash != null
									&& window.location.hash != '') {

								id = window.location.hash;

								oakHomeFactory
										.getContentById(
												id.trim().replace("#/", ""))
										.then(
												function success(response) {

													setTimeout(
															function() {
																$scope
																		.$apply(function() {

																			$scope.article = response.results[0];
																			
																			tmp = null;
																			
																			for(i=0;i<$scope.article.tags.length;i++){
																				if(tmp==null){
																					tmp=$scope.article.tags[i];
																				}
																				else{
																					tmp = tmp + " " + $scope.article.tags[i];
																				}
																			}
																			
																			$scope.article.tags = tmp;
																			

																		});
															}, 10);

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

							$scope.addTags = function(tag) {

								article = $scope.article;

								if (article == null) {
									$scope.article = {
										tags : ""
									};
									article = $scope.article;
								}

								if (article.tags == null) {
									article.tags = "";
								}

								if (article.tags.search(tag) < 0) {
									article.tags = article.tags + " " + tag;
								}

							}

							$scope.addTagsToList = function(tag) {

								article = $scope.article;

								if (article.tags == null) {
									article.tags = [];
								}

								found = false;
								
								for(i=0;i<article.tags.length;i++){
									if(article.tags[i].search(tag) >= 0){
										found=true;
									}
								}
								
								if (!found) {
									article.tags.push(tag);
								}

							}

							$scope.createArticle = function(articleFormObj) {

								var file = $("#displayImage").get(0).files[0];
								var bdata = new FormData();

								bdata.append('content_type', 'articles');
								bdata.append('tags', articleFormObj.tags);
								bdata.append('title', articleFormObj.title);
								bdata.append('intro', articleFormObj.intro);
								bdata.append('displayImage', file);
								bdata.append('content',
										CKEDITOR.instances.editor1.getData());

								oakHomeFactory
										.createContent(bdata)
										.then(
												function success(response) {

													alert("Your article was uploaded. Stay on this page to write another Article or click close to go back.");
													clearForm(articleFormObj);

												},
												function error(response) {
													$log
															.debug('There is some issue while creating  article ');
												});
							}

							function clearForm(articleFormObj) {
								articleFormObj.intro = null;
								articleFormObj.tags = null;
								articleFormObj.title = null;
								CKEDITOR.instances.editor1.setData('');
								$("#displayImage").val('');

							}

							$scope.resetForm = function(articleFormObj) {
								clearForm(articleFormObj);
							}
							
							$scope.updateTags = function(){
								
								var bdata = new FormData();
								
								bdata.append('tags', $scope.article.tags);

								oakHomeFactory
										.updateArticle($scope.article.id,bdata)
										.then(
												function success(response) {

													alert("Tags for this Article were updated. Stay on this page to do more updates to this Article or click close to go back.");
													

												},
												function error(response) {
													$log
															.debug('There is some issue while updating  article ');
												});
							}
							
							$scope.updateTitle = function(){
								
								var bdata = new FormData();
								
								bdata.append('title', $scope.article.name);

								oakHomeFactory
										.updateArticle($scope.article.id,bdata)
										.then(
												function success(response) {

													alert("Title of this Article was updated. Stay on this page to do more updates to this Article or click close to go back.");
													

												},
												function error(response) {
													$log
															.debug('There is some issue while updating  article ');
												});
							}
							
							$scope.updateIntro = function(){
								
								var bdata = new FormData();

								bdata.append('intro', $scope.article.intro);

								oakHomeFactory
										.updateArticle($scope.article.id,bdata)
										.then(
												function success(response) {

													alert("Introduction for this Article was updated. Stay on this page to do more updates to this Article or click close to go back.");
													

												},
												function error(response) {
													$log
															.debug('There is some issue while updating  article ');
												});
							}
							
							$scope.updateDisplayImage = function(){
								var file = $("#displayImage").get(0).files[0];
								var bdata = new FormData();

								bdata.append('displayImage', file);

								oakHomeFactory
										.updateArticle($scope.article.id,bdata)
										.then(
												function success(response) {

													alert("Display Image for this Article was updated. Stay on this page to do more updates to this Article or click close to go back.");
													

												},
												function error(response) {
													$log
															.debug('There is some issue while updating  article ');
												});
							}
							
							$scope.updateContent = function(){
								
								var bdata = new FormData();

								bdata.append('content',
										CKEDITOR.instances.editor1.getData());

								oakHomeFactory
										.updateArticle($scope.article.id,bdata)
										.then(
												function success(response) {

													alert("Article content was updated. Stay on this page to do more updates to this Article or click close to go back.");
													

												},
												function error(response) {
													$log
															.debug('There is some issue while updating  article ');
												});
							}
							
							$scope.deleteArticle = function(){
							
								oakHomeFactory
										.deleteArticle($scope.article.id)
										.then(
												function success(response) {

													alert("Article was deleted. It would not show up on the website. If you wish to restore this article, please contact the System Administrator.");
													

												},
												function error(response) {
													$log
															.debug('There is some issue while deleting  article ');
												});
							}
							

						} ]);