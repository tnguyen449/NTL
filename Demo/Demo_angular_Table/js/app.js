var app = angular.module("myApp", ["angular.filter", "ui.bootstrap"]);
/**
 * @ngdoc controller
 * @name app.controller:MainController
 * @function
 * @description
 * # MainController
 */
app.controller('MainController', ['$scope', '$http', 'modalFactory', function($scope, $http, modalFactory) {
    $scope.orders = {};
    //Using $http service to get data from JSON Object.
    $http.get("./json/order.json").then(function(response) {
        $scope.orders = response.data;
        console.log("Order from Main Controller: " + $scope.orders);
        $scope.ShowOrderDetail = function() {
            modalFactory.open('/templates/OrderModal.html', 'ShowOrderController', 'md', {
                orders: $scope.orders
            });
        };
    });
}]);

app.controller("ShowOrderController", ['$scope', '$uibModalInstance', 'orders', function($scope, $uibModalInstance, orders) {
    $scope.orderDetails = orders;
    $scope.Cancel = function() {
        $uibModalInstance.dismiss();
    };
    console.log("Order is casted to Show Order Controller: " + $scope.orderDetails);
    $scope.Save = function() {
        console.log("Save Ok.");
    };
}]);

app.factory('modalFactory', function($uibModal, $uibModalStack) {
    return {
        open: function(template, controller, size, params) {
            return $uibModal.open({
                anmimation: true,
                templateUrl: template, //|| "templates/eventRegistrationForm.html"
                controller: controller,
                size: size,
                resolve: {
                    params: function(values) {
                        return values;
                    }
                },
                close: function() {
                    $uibModalStack.dismiss();
                }
            });
        }
    };
});