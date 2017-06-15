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
        $scope.ShowOrderDetail = function(index) {
            $uibModal.open({
                anmimation: true,
                templateUrl: 'templates/OrderModal.html', //|| "templates/eventRegistrationForm.html"
                controller: 'ShowOrderController',
                size: 'lg',
                resolve: {
                    params: function() {
                        return $scope.orders;
                    },
                    index: function() {
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

app.controller("ShowOrderController", ['$scope', '$uibModalInstance', 'params', 'index', function($scope, $uibModalInstance, params, index) {
    $scope.orderDetails = {};
    $scope.orderDetails = params;
    $scope.index = index;
    $scope.Cancel = function() {
        $uibModalInstance.dismiss();
    };
    $scope.Print = function() {

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

app.filter('numberFixedLen', function() {
    return function(n, len) {
        var num = parseInt(n, 10);
        len = parseInt(len, 10);
        if (isNaN(num) || isNaN(len)) {
            return n;
        }
        num = '' + num;
        while (num.length < len) {
            num = '0' + num;
        }
        return num;
    };
});