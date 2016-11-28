var homeApp = angular.module('homeApp', []).directive('news-slider-directive',function(){
	windows.alert("test 1");
	return function(scope,element,attrs){
		windows.alert("test2");
		if(scope.$last){
			windows.alert("last");
		}
	};
});


homeApp.config(['$httpProvider', function ($httpProvider) {
	
	if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};    
    }  	
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
	$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
	$httpProvider.defaults.withCredentials = true;
	$httpProvider.defaults.headers.common['Access-Control-Max-Age'] = '1728000';
    $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript';
    $httpProvider.defaults.headers.common['Content-Type'] = 'application/json; charset=utf-8';
    $httpProvider.defaults.useXDomain = true;
	
}]);

homeApp.run(function($http) {
	delete $http.defaults.headers.common['X-Requested-With']; 
	$http.defaults.headers.put = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With'
    };
	$http.defaults.useXDomain = true;

	angular.element("#Login,#Signup,#Forgetpass,#loginSignUP").on("click", function(){
		angular.element(".oakHomeBody").css("padding-right", "");
	});
	
});
