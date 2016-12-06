homeApp
		.factory(
				'userFactory',
				[
						'$http',
						'$log',
						function($http, $log) {

							var userFactory = {};

							userFactory.whoami = function(token) {
								var url = AppConfig.appUrl + 'whoami';
								var req = {
									method : 'POST',
									url : url,
									headers : {
										Authorization : 'Bearer ' + token
									}
								}

								return $http(req)
										.then(
												function success(response) {
													return response.data;
													//showSuccessAlert("Please check your mailbox for an Activation mail.");
												},
												function error(response) {
													//showErrorAlert('There was some issue while creating  user');
												});

							}
							
							
							userFactory.logoff = function() {
								
								token = util.getCookie("jwt");
								
								var url = AppConfig.appUrl + 'logoff';
								var req = {
									method : 'GET',
									url : url,
									headers : {
										Authorization : 'Bearer ' + token
									}
								}

								return $http(req)
										.then(
												function success(response) {
													return response.data;
													//showSuccessAlert("Please check your mailbox for an Activation mail.");
												},
												function error(response) {
													//showErrorAlert('There was some issue while creating  user');
												});

							}
							
							userFactory.createUsers = function(userData) {
								var url = AppConfig.appUrl + 'users';
								var req = {
									method : 'POST',
									url : url,
									data : userData
								}

								return $http(req)
										.then(
												function success(response) {
													showSuccessAlert("Please check your mailbox for an Activation mail.");
												},
												function error(response) {
													showErrorAlert('There was some issue while creating  user');
												});

							}

							userFactory.login = function(user) {
								var url = AppConfig.appUrl + 'login';
								var key = btoa(user.id + ":" + user.password);
								AppConfig.key = key;
								var req = {
									method : 'GET',
									url : url,
									headers : {
										Authorization : 'Basic ' + AppConfig.key
									}
								}

								return $http(req)
										.then(
												function success(response) {
													//showSuccessAlert("You were able to log in successfully.");
													return response.data;
												},
												function error(response) {
													//showErrorAlert("Please enter a valid username and password. Please activate your account if you have not done that already.");
												});

							}

							userFactory.forgotPassword = function(email) {
								var url = AppConfig.appUrl + 'forgotPassword/'
										+ email;
								
								var req = {
									method : 'GET',
									url : url,
									async: false
								}

								return $http(req)
										.then(
												function success(response) {
													showSuccessAlert("Your password has been sent to your email address.");
													return response.data;
												},
												function error(response) {
													showErrorAlert("We could not find your Email Address in the Database.");
												});

							}

							return userFactory;

						} ]);