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
                    return vm.receiverInfo
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
        'id': 0,
        'quantity': null,
        'type': "",
        'description': "",
        'total': null
    }];



    vm.AddItem = function(products) {

        vm.inserted = {
            'id': vm.products.length + 1,
            'quantity': null,
            'type': "",
            'description': "",
            'total': null
        };
        vm.products.push(vm.inserted);


    };

    //3 Functions for the last modal template
    vm.Confirm = function() {
        console.log(vm.senderInfo);
        console.log(vm.receiverInfo);
        vm.selectedAll = true;
        var newList = [];
        angular.forEach(vm.products, function(product) {
            product.selected = vm.selectAll;
            newList.push(product);
        });
        vm.products = newList;
        $uibModalStack.dismissAll();
        console.log(vm.products);
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

        var subtotal = 1.;
        for (var i = 0; i < vm.products.length - 1; i++) {
            if (vm.products[i].total != 0) {
                subtotal = subtotal + vm.products[i].total;
                console.log(typeof(subtotal));
                console.log(typeof(vm.products[i].id));
                console.log(parseInt(subtotal) + 3000);
            }

        };

        return parseInt(subtotal);
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
        'receiverName': 'Vuong Phan',
        'receiverPhone': '0935656667'
    };

    vm.MerchandiseInfo = [{
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
    ];


    vm.billOfLandingInfo = {
        'bolId': '1',
        'sender': vm.customerInfo.senderName,
        'receiver': vm.customerInfo.receiverName,
        'merchandise': vm.MerchandiseInfo[1].SubTotal

    };
    vm.submit = {
        'MerchandiseInfo': vm.MerchandiseInfo,
        'CustomerInfo': vm.customerInfo
    }

    vm.TestData = function() {
        console.log(vm.MerchandiseInfo[1].Id);
        console.log(vm.submit);
    }
    vm.something = [{
            "orderID": "Ord0001",
            "sender": {
                "fullName": "Hansyn",
                "address": "221 Mountainview Ave, NY 13224, USA",
                "phone": "1 (800) 233-2742"
            },
            "receiver": {
                "fullName": "John Roksun",
                "address": "223 Oak St, WV 26181, USA",
                "phone": "1 (617) 634-6218"
            },
            "product": [{
                    "productID": "PI0012",
                    "unit": "Set",
                    "quantity": "5"
                },
                {
                    "productID": "PI034",
                    "unit": "Packge",
                    "quantity": "10"
                }
            ],
            "sentDate": "01/06/2017",
            "receivedDate": "10/06/2017",
            "status": "In-stock"
        },
        {
            "orderID": "Ord0011",
            "sender": {
                "fullName": "Justin J",
                "address": "36 Indian Point Rd, ME 04609, USA",
                "phone": "1 (617) 634-6260"
            },
            "receiver": {
                "fullName": "John Roksun",
                "address": "1000 Main St, NY 11741, USA",
                "phone": "1 (800) 233-2742"
            },
            "product": [{
                    "productID": "PI0112",
                    "unit": "Packs",
                    "quantity": "5"
                },
                {
                    "productID": "PI134",
                    "unit": "Kilogram",
                    "quantity": "101"
                },
                {
                    "productID": "PI0012",
                    "unit": "Piece",
                    "quantity": "223"
                },
                {
                    "productID": "PI1112",
                    "unit": "Set",
                    "quantity": "151"
                }
            ],
            "sentDate": "21/11/2016",
            "receivedDate": "11/01/2017",
            "status": "In-Process"
        },
        {
            "orderID": "Ord0010",
            "sender": {
                "fullName": "Kicy Martin",
                "address": "241 Fayette Blvd, NY 13224, USA",
                "phone": "1 (773) 377-2804"
            },
            "receiver": {
                "fullName": "Han Ji Hwan",
                "address": "727 Hudson Hills Rd, ME 04449, USA",
                "phone": " 1 (877) 609-2233"
            },
            "product": [{
                    "productID": "PI1012",
                    "unit": "Set",
                    "quantity": "15"
                },
                {
                    "productID": "PI034",
                    "unit": "Package",
                    "quantity": "101"
                }
            ],
            "sentDate": "22/01/2017",
            "receivedDate": "13/05/2017",
            "status": "Completed"
        }
    ];
    vm.test = function(input) {
        if (angular.isArray(input)) {
            angular.forEach(input, function(value) {
                if (angular.isArray(value)) {
                    vm.test(value);
                    console.log(value);
                } else {
                    angular.forEach(input, function(cInput) {
                        if (angular.isArray(cInput[3])) {
                            vm.test(cInput);
                        } else {
                            console.log(cInput)
                        }
                    })
                }
            })
        }
    }
});