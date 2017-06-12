var app = angular.module("myApp", []);
/**
 * @ngdoc controller
 * @name app.controller:MainController
 * @function
 * @description
 * # MainController
 */
app.controller('MainController', ['$scope', '$http', function($scope, $http) {
    $scope.orders = [];

    //Using $http service to get data from JSON Object.
    $http.get("./json/order.json").then(function(response) {
        $scope.orders = response.data;

        //Loop all Product items in Order items to get Product Name.
        for (var i = 0; i < $scope.orders.length; i++) {
            var orders = $scope.orders[i];
            var element = orders.product;
            for (var j = 0; j < element.length; j++) {
                var product = element[j].productName;
                console.log(product);
            }
        }
    })
}]);