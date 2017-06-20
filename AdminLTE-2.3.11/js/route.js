var app = angular.module("myApp", ['ngRoute', 'Configurations'])

app.config(function($routeProvider){
    $routeProvider.when("/", {
        templateUrl: "templates/login.html",
        controller: "LoginController"
    }).when("/home", {
        templateUrl: "templates/home.html",
        controller: "MainController"
    }).when("/orders/list", {
        templateUrl: "templates/ordersList.html",
        controller: "MainController"
    })
});