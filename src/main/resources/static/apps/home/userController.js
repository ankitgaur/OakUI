homeApp.controller('userCtrl', [
		'$scope',
		'$rootScope',
		'$http',
		'$log',
		'userFactory',
		function($scope, $rootScope, $http, $log,
				userFactory) {

			$scope.createUser = function(userFormObj) {

				userFormObj.grecaptcharesponse = grecaptcha.getResponse();
				userFactory.createUsers(userFormObj).then(
						function success(response) {
							$('#Signup').modal('hide');

						}, function error(response) {

						});
			}

			$scope.forgotPassword = function(email) {
				userFactory.forgotPassword(email).then(
						function success(response) {

						}, function error(response) {

						});
			}

			$scope.logoff = function() {
				
				
				userFactory.logoff().then(function success(response) {
					if (response != undefined || response != null) {
						setTimeout(function() {
							$scope.$apply(function() {
								
								util.setCookie("jwt","",0);
								location.reload();

								//$state.reload();
							});
						}, 0);
					}
				}, function error(response) {

				});
			}
			
			$scope.userDDToggle = function(){
				$('.entry-dropdown').toggleClass('open');
			}
			
			$scope.login = function(user) {

				userFactory.login(user).then(function success(response) {
					if (response != undefined || response != null) {
						setTimeout(function() {
							$scope.$apply(function() {
								$scope.user = response;
								
								util.setCookie("jwt",response.token,1);
								location.reload();

								//$state.reload();
							});
						}, 0);
					}
				}, function error(response) {

				});

			}

		} ]);
