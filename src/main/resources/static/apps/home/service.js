homeApp
		.factory(
				'oakHomeFactory',
				[
						'$http',
						'$log',
						function($http, $log) {

							var oakHomeFactory = {};

							oakHomeFactory.createContent = function(content){
								
								token = util.getCookie("jwt");
								
								var url = AppConfig.appUrl+'content';
								return $http.post(url, content, {
							          transformRequest: angular.identity,
							          headers: {
							        	  Authorization : 'Bearer ' + token,
							        	  'Content-Type': undefined }
							       }).then(function success(response) {
							    	   //showSuccessAlert("Article created successfully.");
							    	   return response.data;
									   
									},function error(response) {
										//showErrorAlert("Article could not be created.Please contact the System Administrator.");
								});
						  
							
						    };
							
							oakHomeFactory.createForumPosts = function(
									ForumPostData) {
								var url = AppConfig.appUrl + 'forum_post';
								var req = {
									method : 'POST',
									url : url,
									data : ForumPostData,
									headers : {
										Authorization : 'Basic '
												+ AppConfig.key
									}
								}

								return $http(req)
										.then(
												function success(response) {
													$log
															.debug('article created successfully ');
												},
												function error(response) {
													$log
															.debug('There is some issue while getting data from rest service');
												});
							}
							

							oakHomeFactory.createTopic = function(
									forumTopicData) {
								var url = AppConfig.appUrl + 'forum_topics';
								return $http
										.post(
												url,
												forumTopicData,
												{
													transformRequest : angular.identity,
													headers : {
														Authorization : 'Basic '
																+ AppConfig.key,
														'Content-Type' : undefined
													}

												})
										.then(
												function success(response) {
													return response.data;
													showSuccessAlert('Forum Topic was created.');
												},
												function error(response) {
													showErrorAlert('There was some issue while creating Forum Topic. Please contact your System Administrator.');
												});
							}

							oakHomeFactory.deleteTopicByID = function(
									forumTopicID) {
								var url = AppConfig.appUrl + 'forum_topics';
								url = url + "/" + forumTopicID;
								return $http(
										{
											method : 'DELETE',
											url : url,
											crossDomain : true,
											headers : {
												Authorization : 'Basic '
														+ AppConfig.key
											}

										})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting data from rest service');
												});

							}

							oakHomeFactory.deleteForumPostByID = function(
									forumPostID) {
								var url = AppConfig.appUrl + 'forum_post';
								url = url + "/" + forumPostID;
								return $http(
										{
											method : 'DELETE',
											url : url,
											crossDomain : true,
											headers : {
												Authorization : 'Basic '
														+ AppConfig.key
											}

										})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting data from rest service');
												});

							}

							oakHomeFactory.createBlog = function(bdata) {
								var url = AppConfig.appUrl + 'blogs';

								$http
										.post(
												url,
												bdata,
												{
													transformRequest : angular.identity,
													headers : {
														Authorization : 'Basic '
																+ AppConfig.key,
														'Content-Type' : undefined
													}

												})

										.success(
												function() {
													showSuccessAlert("Blog was created successfully.");
												})

										.error(
												function() {
													showErrorAlert('There were some issues while creating your blog. Please contact your System Administrator');
												});

							};

							oakHomeFactory.createBlogPost = function(bdata) {
								var url = AppConfig.appUrl + 'blog_entries';
								$http
										.post(
												url,
												bdata,
												{
													transformRequest : angular.identity,
													headers : {
														Authorization : 'Basic '
																+ AppConfig.key,
														'Content-Type' : undefined
													}
												})

										.success(
												function() {
													showSuccessAlert("Blog Post was created successfully.");
												})

										.error(
												function() {
													showErrorAlert('There were some issues while creating your blog post. Please contact your System Administrator');
												});
							};

							oakHomeFactory.getPostsForTopic = function(id) {
								var url = AppConfig.appUrl + 'forum_post/' + id
										+ '/' + 100;

								return $http({
									method : 'GET',
									url : url,
									crossDomain : true
								})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting forum topics from rest service');
												});

							};

							oakHomeFactory.getTopic = function(id) {
								var url = AppConfig.appUrl + 'forum_topics/'
										+ id;

								return $http({
									method : 'GET',
									url : url,
									crossDomain : true
								})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting forum topics from rest service');
												});

							};

							oakHomeFactory.getTopicsForCategory = function(id) {
								var url = AppConfig.appUrl + 'forum_topics/'
										+ id + '/' + 100;

								return $http({
									method : 'GET',
									url : url,
									crossDomain : true
								})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting forum topics from rest service');
												});

							};

							oakHomeFactory.getCategories = function() {
								var url = AppConfig.appUrl + 'forum_categories';

								return $http({
									method : 'GET',
									url : url,
									crossDomain : true
								})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting forum categories from rest service');
												});

							};

							oakHomeFactory.getBlogs = function() {
								var url = AppConfig.appUrl + 'blogs';

								return $http({
									method : 'GET',
									url : url,
									crossDomain : true
								})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting blog category from rest service');
												});

							};

							oakHomeFactory.getMostPopularBlogsPost = function() {
								var url = AppConfig.appUrl
										+ 'popular_blog_entries';
								return $http({
									method : 'GET',
									url : url,
									crossDomain : true
								})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting data from rest service');
												});

							}

							oakHomeFactory.getMyBlogs = function() {
								var url = AppConfig.appUrl + '/myblogs';

								return $http(
										{
											method : 'GET',
											url : url,
											crossDomain : true,
											headers : {
												Authorization : 'Basic '
														+ AppConfig.key
											}
										})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting data from rest service');
												});

							};

							oakHomeFactory.getMyBlogPosts = function() {
								var url = AppConfig.appUrl
										+ 'blog_entries/user';

								return $http({
									method : 'GET',
									url : url,
									crossDomain : true
								})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting data from rest service');
												});

							};

							oakHomeFactory.getTopBlogs = function() {
								var url = AppConfig.appUrl + 'blog_entries';

								return $http({
									method : 'GET',
									url : url,
									crossDomain : true
								})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting data from rest service');
												});

							};

							oakHomeFactory.getPopularContent = function(content_type,tags) {
								var url = AppConfig.appUrl
										+ 'content/popular/' + content_type + '?tags='
										+ tags;

								return $http({
									method : 'GET',
									url : url,
									crossDomain : true
								})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting data from rest service');
												});

							};

							oakHomeFactory.getContent = function(content_type,tags) {
								var url = AppConfig.appUrl
								+ 'content/type/' + content_type + '?tags='
								+ tags;

								return $http({
									method : 'GET',
									url : url,
									crossDomain : true
								})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting data from rest service for category ');
												});

							};

							oakHomeFactory.getContentById = function(id) {
								var url = AppConfig.appUrl + 'content/' + id;

								return $http({
									method : 'GET',
									url : url,
									crossDomain : true
								})
										.then(
												function successCallback(
														response) {
													return response.data;
												},
												function errorCallback(response) {
													$log
															.debug('There is some issue while getting data from rest service');
												});

							};
							
							oakHomeFactory.updateArticle = function(id, articleData){
								
								token = util.getCookie("jwt");
								
								var url = AppConfig.appUrl+'content/'+id;
								return $http.post(url, articleData, {
							          transformRequest: angular.identity,
							          headers: {
							        	  Authorization : 'Bearer ' + token,
							        	  'Content-Type': undefined }
							       }).then(function success(response) {
							    	   //showSuccessAlert("Article created successfully.");
							    	   return response.data;
									   
									},function error(response) {
										//showErrorAlert("Article could not be created.Please contact the System Administrator.");
								});
						  
							
						    };
						    
						    oakHomeFactory.deleteArticle = function(id){
						    
						    	token = util.getCookie("jwt");
						    	var url = AppConfig.appUrl+'content/'+id;
						  	 
						  	return $http({
						  		  method: 'DELETE',
						  		  url: url,
						  		  crossDomain:true,
						  		headers: {
						        	  Authorization : 'Bearer ' + token
						  		}
						  		  
						  	 }).then(function successCallback(response) {
						  		 return response.data;
						  	  }, function errorCallback(response) {
						  			$log.debug('There is some issue while getting data from rest service');
						  	  }); 
						    
						  };
						    

							return oakHomeFactory;

						} ]);
