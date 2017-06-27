var app = angular.module('app', ['ui.bootstrap']);
app.controller('MainController', ['$uibModal', '$uibModalStack', function($uibModal, $uibModalStack) {
    var vm = this;
    vm.CreateOrder = function() {
        $uibModal.open({
            animation: true,
            templateUrl: 'templates/ReceiverOrderModal.html',
            controller: 'FirstModalController',
            controllerAs: 'receiverCtrl',
            size: 'md',
            bindToController: true
        });
    };
}]);

app.controller('FirstModalController', ['$uibModal', '$uibModalStack', '$uibModalInstance', function($uibModal, $uibModalStack, $uibModalInstance) {
    var vm = this;
    vm.receiver = {};
    vm.Previous = function() {
        $uibModalInstance.dismiss('cancel');
    };
    vm.Cancel = function() {
        $uibModalStack.dismissAll('cancel');
    };
    vm.MoveToSecondForm = function() {
        $uibModal.open({
            animation: true,
            templateUrl: 'templates/SenderOrderModal.html',
            controller: 'SecondModalController',
            controllerAs: 'senderCtrl',
            size: 'md',
            bindToController: true,
            resolve: {
                receiver: function() {
                    return vm.receiver;
                }
            }
        });
    };
}]);

app.controller('SecondModalController', ['$uibModal', '$uibModalStack', '$uibModalInstance', 'receiver', function($uibModal, $uibModalStack, $uibModalInstance, receiver) {
    var vm = this;
    vm.sender = {};
    var receiverInfo = receiver;
    vm.Previous = function() {
        $uibModalInstance.dismiss('cancel');
    };
    vm.Cancel = function() {
        $uibModalStack.dismissAll('cancel');
    };
    vm.MoveToThirdModal = function() {
        vm.GetSender = function() {
            return vm.sender;
        };
        $uibModal.open({
            animation: true,
            templateUrl: 'templates/OrderListModal.html',
            controller: 'CreateController',
            controllerAs: 'createCtrl',
            size: 'lg',
            bindToController: true,
            resolve: {
                sender: function() {
                    return vm.sender;
                },
                receiver: function() {
                    return receiverInfo
                }
            }
        });
    };
}]);

app.controller('CreateController', ['$uibModal', '$uibModalStack', '$uibModalInstance', 'sender', 'receiver', function($uibModal, $uibModalStack, $uibModalInstance, sender, receiver) {
    var vm = this;
    var senderInfo = sender;
    var receiverInfo = receiver;
    vm.products = [{
        'quantity': "",
        'type': "",
        'description': ""
    }];
    vm.Confirm = function() {
        console.log(senderInfo);
        console.log(receiverInfo);
        vm.selectedAll = true;
        var newList = [];
        angular.forEach(vm.products, function(product) {
            product.selected = vm.selectAll;
            newList.push(product);
        });
        vm.products = newList;
        $uibModalStack.dismissAll('cancel');
    };

    vm.AddItem = function(product) {
        vm.products.push({
            'quantity': "",
            'type': "",
            'description': ""
        });
    };

    //Remove items that are checked in checkbox.
    vm.RemoveItem = function() {
        var newProductList = [];
        vm.selectedAll = false;
        angular.forEach(vm.products, function(product) {
            if (!product.selected) {
                newProductList.push(product);
            };
        });
        vm.products = newProductList;
    };

    //Select all items in checkbox
    vm.SelectAll = function() {
        if (!vm.selectedAll) {
            vm.selectedAll = false;
        } else {
            vm.selectedAll = true;
        };
        angular.forEach(vm.products, function(product) {
            product.selected = vm.selectedAll;
        });
    }
}]);