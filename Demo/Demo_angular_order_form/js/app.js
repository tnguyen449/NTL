var app = angular.module('app', ['ui.bootstrap']);
app.controller('MainController', ['$scope', '$uibModal', '$uibModalStack', function($scope, $uibModal, $uibModalStack) {
    $scope.CreateOrder = function() {
        $uibModal.open({
            animation: true,
            templateUrl: 'templates/ReceiverOrderModal.html',
            controller: 'CreateController',
            size: 'md'
        });

    };
}]);

app.controller('CreateController', ['$scope', '$uibModal', '$uibModalStack', '$uibModalInstance', function($scope, $uibModal, $uibModalStack, $uibModalInstance) {
    var vm = this;
    $scope.products = [{
        'quantity': "",
        'type': "",
        'description': ""
    }];
    $scope.receiver = {};
    $scope.sender = {};
    $scope.senderObject = {};
    console.log($scope.sender);
    $scope.Previous = function() {
        $uibModalInstance.dismiss('cancel');
    };
    $scope.Cancel = function() {
        $uibModalStack.dismissAll('cancel');
    };

    $scope.MoveToSecondForm = function() {
        $uibModal.open({
            animation: true,
            templateUrl: 'templates/SenderOrderModal.html',
            controller: 'CreateController',
            size: 'md'
        });
    };

    $scope.MoveToThirdModal = function() {
        // $scope.show = true;
        // $scope.closeAlert = function(index) {
        //     $scope.show = false;
        // };
        $uibModal.open({
            animation: true,
            templateUrl: 'templates/OrderListModal.html',
            controller: 'CreateController',
            size: 'lg',
            scope: $scope,
            resolve: {
                sender: function() {
                    return $scope.sender;
                }
            }
        }).result.then(function(result) {
            $scope.senderObject = result;
        });
        console.log($scope.senderObject);
    };

    $scope.AddItem = function(product) {
        $scope.products.push({
            'quantity': "",
            'type': "",
            'description': ""
        });
    };

    //Remove items that are checked in checkbox.
    $scope.RemoveItem = function() {
        var newProductList = [];
        $scope.selectedAll = false;
        angular.forEach($scope.products, function(product) {
            if (!product.selected) {
                newProductList.push(product);
            };
        });
        $scope.products = newProductList;
    };

    //Select all items in checkbox
    $scope.SelectAll = function() {
        if (!$scope.selectedAll) {
            $scope.selectedAll = false;
        } else {
            $scope.selectedAll = true;
        }
        angular.forEach($scope.products, function(product) {
            product.selected = $scope.selectedAll;
        })
    }

    //This function to get data form Modal and save to scope.
    $scope.Confirm = function() {
        // $scope.receiverObject = receiver;
        console.log($scope.senderObject);
        $scope.selectedAll = true;
        var newList = [];
        angular.forEach($scope.products, function(product) {
            product.selected = $scope.selectAll;
            newList.push(product)
        });
        $scope.products = newList;
        $uibModalStack.dismissAll('cancel');
        console.log($scope.products);
    };
}]);