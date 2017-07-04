var app = angular.module('ntlApp', ['ngRoute']);
app.config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: 'templates/home.html',
            controller: 'MainController',
            controllerAs: 'mainCtrl'
        })
        .when("/orders/create", {
            templateUrl: 'templates/CreateOrder.html',
            controller: 'CreateOrderController',
            controllerAs: 'createOrderCtrl'
        })
        .when("/orders", {
            templateUrl: 'templates/Orders.html',
            controller: 'MainController',
            controllerAs: 'mainCtrl'
        })
})