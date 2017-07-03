var app = angular.module('app', ['ui.bootstrap', 'angular.filter']);
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
    // vm.Previous = function() {
    //     $uibModalInstance.dismiss('cancel');
    // };
    vm.Cancel = function() {
        $uibModalStack.dismissAll('cancel');
    };
    vm.MoveToSecondForm = function() {
        $uibModalInstance.dismiss(vm.receiver);
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

app.controller('SecondModalController', ['$uibModal', '$uibModalStack', '$uibModalInstance', 'receiver', '$http', function($uibModal, $uibModalStack, $uibModalInstance, receiver, $http) {
    var vm = this;
    vm.sender = {};
    vm.receiverInfo = receiver;
    vm.Previous = function() {
        $uibModalInstance.dismiss(vm.sender);
    };
    vm.Cancel = function() {
        $uibModalStack.dismissAll('cancel');
    };
    vm.MoveToThirdModal = function() {
        vm.test = [];
        // $http.get('http://localhost:57363/api/values').then(function(response) {
        //     vm.test = response.data;

        //     $uibModal.open({
        //         animation: true,
        //         templateUrl: 'templates/OrderListModal.html',
        //         controller: 'CreateController',
        //         controllerAs: 'createCtrl',
        //         // size: 'lg',
        //         windowClass: 'app-modal-window',
        //         bindToController: true,
        //         resolve: {
        //             sender: function() {
        //                 return vm.sender;
        //             },
        //             receiver: function() {
        //                 return vm.test
        //             }
        //         }
        //     });
        // })

        $uibModal.open({
            animation: true,
            templateUrl: 'templates/OrderListModal.html',
            controller: 'CreateController',
            controllerAs: 'createCtrl',
            size: 'lg',
            //  windowClass: 'app-modal-window',
            bindToController: true,
            resolve: {
                sender: function() {
                    return vm.sender;
                },
                receiver: function() {
                    return vm.test
                }
            }
        });
    };
}]);

app.controller('CreateController', ['$uibModal', '$uibModalStack', '$uibModalInstance', 'sender', 'receiver', function($uibModal, $uibModalStack, $uibModalInstance, sender, receiver) {
    var vm = this;
    vm.senderInfo = sender;
    vm.receiverInfo = receiver;
    vm.products = [{
        'quantity': "",
        'type': "",
        'description': ""
    }];

    console.log(vm.receiverInfo);
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
        $uibModalStack.dismissAll();
    }
    vm.Previous = function() {
        $uibModalInstance.dismiss();
    };
    vm.Cancel = function() {
        $uibModalStack.dismissAll();
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
    };

    //script for guarantee value checkbox
    vm.guarantee;
    vm.SelectGuarantee = function(select) {
        if (select == 'true') {
            var total = 400000 * 0.01;
            console.log(total);
        } else {
            var total = 400000;
            console.log(total);
        }
    }

    //script for date picker
    vm.dateOptions = {
        formatYear: 'yyyy',
        maxDate: new Date(2099, 12, 31),
        minDate: new Date(),
        startingDay: 1
    };

    vm.PickDate = function() {
        vm.popUpDate.opened = true;
    };

    vm.SetDate = function(year, month, day) {
        vm.dt = new Date(year, month, day);
    };

    vm.format = 'dd/MM/yyyy';

    vm.popUpDate = {
        opened: false
    };
}]);