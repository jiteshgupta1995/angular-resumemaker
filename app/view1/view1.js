'use strict';

var app = angular.module('myApp.view1', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}]);

app.controller('View1Ctrl', ["$scope", "$http", "appSettings", "fetchService", function($scope, $http, appSettings, fetchService){
	// console.log(appSettings);
	$scope.aname = "";
    $scope.email = "";
    $scope.address = "";
    $scope.number = "";
    $scope.interest = "";
    $scope.items = [];
    $scope.status = '';

	$scope.processForm = function () {
	  var item = {
	    name: $scope.name,
	    number: $scope.number,
	    email: $scope.email,
	    address: $scope.address,
	    interest: $scope.interest
	  };
	  postItem(item);
	};
	function postItem (item) {
	  // optimistic ui update
	  $scope.items.push({key: $scope.name, value: $scope.email});
	  // send post request
	  $http.post(appSettings.db, item)
	    .success(function () {
	      $scope.status = '';
	      alert("Added");
	      getItems();
	    }).error(function (res) {
	      $scope.status = 'Error: ' + res.reason;
	      console.log($scope.status);
	      // refetch items from server
	      getItems();
	    });
	}

	function getItems () {
      $http.get(appSettings.db + '/_design/fetch/_view/fetch')
        .success(function (data) {
          $scope.items = data.rows;
        });
    }
    getItems();

    $scope.goToView2 = function(key) {
    	fetchService.key = key;
    	window.location="#/view2";
    };

    $scope.edit = function(key) {
    	$http.get(appSettings.db + '/'+key+'?include_docs=true')
        .success(function (data) {
			$scope.name = data.name;
			$scope.number = data.number;
			$scope.email = data.email;
			$scope.address = data.address;
			$scope.interest = data.interest;
        });
    };
}]);