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
    vm.animation = [{
        'show': 'false',
        'disabled': true
    }];
    //$scope for add new item in bill
    vm.products = [{
        'quantity': "",
        'type': "",
        'description': "",
        'total': 0
    }];
    vm.AddItem = function(product) {
        vm.products.push({
            'quantity': "",
            'type': "",
            'description': "",
            'total': 0
        });
        console.log(vm.products.total);
    };

    //3 Functions for the last modal template
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


    vm.declaredValue;
    vm.SelectBillingDeclaration = function(select) {
        if (select == 'true') {
            vm.animation.disabled = false;
            console.log(vm.animation.disabled);
        } else {
            vm.animation.disabled = true;
            console.log(vm.animation.disabled);
        }
    };

    //script for guarantee value checkbox
    vm.guarantee;
    vm.SelectGuarantee = function(select) {
        if (select == 'true') {
            var total = vm.products.total + (vm.products.total * 0.01);
            vm.animation.show = 'true';
            console.log(total);
        } else {
            var total = vm.products.total;
            vm.animation.show = 'false';
            console.log(total);
        }
    };


    //Calculate sub total
    vm.GetSubTotal = function() {
        var total = 0;
        for (var i = 0; i < vm.products.length; i++) {
            var product = vm.products[i];
            product.total = total;
            if (product.total == 0) {
                total = 0;
            }
            total += (product.total + 2000);
        };
        return total;
    };

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

app.controller('TestController', function() {
    var vm = this;
    vm.customerInfo = {
        'senderID': 'SID1',
        'senderName': 'Trung Nguyen',
        'senderPhone': '0934573004',
        'receiverID': 'RID1',
        'receiverName': 'Anh Phan',
        'receiverPhone': '0935656667'
    };

    MerchandiseInfo = [{
            'Id': 0,
            "MerchandiseId": "SQ1NT1",
            "MerchandiseTypeId": 1,
            "MerchandiseQuantity": "10",
            "MerchandiseUnit": "15",
            "StatusId": 1,
            "IsBreakable": true,
            "IsGuarantee": false,
            "GuaranteePrice": 1000,
            "Description": "Some thing ",
            "SubTotal": 100000,
            "CreatedBy": "Customer"
        },
        {
            "Id": 1,
            "MerchandiseId": "SQ1NT1",
            "MerchandiseTypeId": 2,
            "MerchandiseQuantity": "1",
            "MerchandiseUnit": "5",
            "StatusId": 1,
            "IsBreakable": true,
            "IsGuarantee": false,
            "GuaranteePrice": 1000,
            "Description": "Some thing ",
            "SubTotal": 100000,
            "CreatedBy": "Customer"
        }
    ]

    vm.billOfLandingInfo = {
        'bolId': '1',
        'sender': vm.customerInfo.senderName,
        'receiver': vm.customerInfo.receiverName
    };

    vm.TestData = function() {
        console.log(vm.billOfLandingInfo);
    }
});