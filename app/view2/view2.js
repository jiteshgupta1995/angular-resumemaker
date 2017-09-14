'use strict';

angular.module('myApp.view2', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view2', {
    templateUrl: 'view2/view2.html',
    controller: 'View2Ctrl'
  });
}])

.controller('View2Ctrl', ["$scope", "$http","appSettings", "fetchService", function($scope, $http, appSettings, fetchService) {
	function getItems () {
      $http.get(appSettings.db + '/'+fetchService.key+'?include_docs=true')
        .success(function (data) {
          	$scope.item = data;
          	if($scope.item.interest == "Machine_Learning"){
          		$scope.item.interest = "Machine Learning";
          		$scope.language = ["Python", "R"];
          	}else{
          		$scope.item.interest = "Mobile Application";
          		$scope.language = ["Java", "Android", "iOS", "C", "C++"];
          	}
        });
    }
    getItems();
}]);