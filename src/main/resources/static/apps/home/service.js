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
							
							oakHomeFactory.getContentForParent = function(content_type,parentid) {
								var url = AppConfig.appUrl
								+ 'content/parent/' + content_type + '/'+ parentid
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
