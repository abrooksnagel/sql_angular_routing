var app = angular.module('routeApp', ['ngRoute']);

var name_id;
var start_date;
var end_date;


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/addresses', {
            templateUrl: 'views/addresses.html',
            controller: 'AddressesController'
        })
        .when('/orders', {
            templateUrl: 'views/orders.html',
            controller: 'OrdersController'
        });
        //.when('/users', {
        //    templateUrl: 'views/users.html',
        //    controller: "UsersController"
        //});

    $locationProvider.html5Mode(true);
}]);

app.controller('AddressesController', ['$scope', '$http', function($scope, $http) {



    $http({
        method: 'GET',
        url: '/api/users'
    }).then(function (response) {
        $scope.names = response.data;

    });

    $scope.getAddress = function() {
        name_id = $scope.name_id;
        $http({
            method: 'GET',
            url: '/api/addresses/' + name_id
        }).then(function (response) {
            $scope.addresses = response.data;

        });
    };
    /////Short hand get calls that I can never remember - keeping here for future reference/////
    //$http.get(url, 'data').then(function(response) {});//
}]);

app.controller('OrdersController', ['$scope', '$http', function($scope, $http) {

    $http({
        method: 'GET',
        url: '/api/users'
    }).then(function(response) {
        $scope.names = response.data;

    });

    $scope.getOrder = function() {
        name_id = $scope.name_id;
        start_date = $scope.start_date.toISOString().slice(0,10);
        end_date = $scope.end_date.toISOString().slice(0,10);
        $http({
            method: 'GET',
            url: '/api/orders/' + name_id + "/" + start_date + "/" + end_date
        }).then(function (response) {
            $scope.orders = response.data;


        var orderTotal = 0;
        for (var i=0; i < $scope.orders.length; i++) {

            /////The following whacked out code are attempts to ensure 2 decimal places in orderTotal. Not successful/////
            //orderTotal += (parseInt($scope.orders[i].amount*100))/100;
            orderTotal += (parseFloat($scope.orders[i].amount));
            $scope.orderTotal = orderTotal;

        }
        });
    };
}]);




