var app = angular.module("myApp", ["angular.filter", "ui.bootstrap"]);
/**
 * @ngdoc controller
 * @name app.controller:MainController
 * @function
 * @description
 * # MainController
 */
app.controller('MainController', ['$scope', '$http', '$uibModal', '$uibModalStack', function($scope, $http, $uibModal, $uibModalStack) {
    $scope.orders = [];
    //Using $http service to get data from JSON Object.
    $http.get("./json/order.json").then(function(response) {
        $scope.orders = response.data;
        console.log("Order from Main Controller: " + $scope.orders);
        $scope.ShowOrderDetail = function(index) {
            $uibModal.open({
                anmimation: true,
                templateUrl: 'templates/OrderModal.html', //|| "templates/eventRegistrationForm.html"
                controller: 'ShowOrderController',
                size: 'md',
                resolve: 
                    {
                    params: function() {
                        return $scope.orders;
                    },
                        index: function(){
                            return index;
                        }
                },
                close: function() {
                    $uibModalStack.dismiss();
                }
            });
        };
    });
}]);

app.controller("ShowOrderController", ['$scope','$uibModalInstance', 'params', 'index', function($scope, $uibModalInstance, params, index) {
    $scope.orderDetails = {};
    $scope.orderDetails = params;
    $scope.index = index;
    $scope.Cancel = function() {
        $uibModalInstance.dismiss();
    };
    console.log($scope.orderDetails[1].receiver);
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
                    params: function() {
                        return params;
                    }
                },
                close: function() {
                    $uibModalStack.dismiss();
                }
            });
        }
    };
});