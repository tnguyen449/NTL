(function() {
    'use strict';

    angular.module('BlurAdmin.pages.form')
        .controller('WizardCtrl', WizardCtrl);

    /** @ngInject */
    function WizardCtrl($scope) {
        var vm = this;

        vm.customerInfo = {};
        vm.bolInfo = {};
        vm.shipment = {};
        vm.merchandises = [{
            'id': 1,
            'quantity': null,
            'type': null,
            'description': null,
            'total': null
        }];

        //script for check Assurance check box
        vm.guarantee = false;
        vm.showIdInput = false;
        vm.SenderIdNumber = null;
        vm.SelectGuarantee = function(guarantee) {
            if (guarantee == true) {
                vm.showIdInput = true;
                vm.bolInfo.Assurance = guarantee;
            } else {
                vm.showIdInput = false;
                vm.bolInfo.Assurance = guarantee;
            }
        };

        //script for check Price Declaration check box
        vm.declaredValue = false;
        vm.SelectBillingDeclaration = function(select) {
            if (select == true) {
                vm.animation.disabled = false;
            } else {
                vm.animation.disabled = true;
            }
        };

        vm.isSpecialPrice = false;
        vm.SelectSpecialPriceOption = function(select) {
            if (select == true) {
                vm.pod.disabled = false;
            } else {
                vm.pod.disabled = true;
            }
        };

        //Add items in bill of landing
        vm.addItem = function() {
            vm.inserted = {
                'id': vm.merchandises.length + 1,
                'quantity': null,
                'type': "",
                'description': "",
                'total': null
            };
            vm.merchandises.push(vm.inserted);
            console.log(vm.inserted.id);
        };

        //Remove items that are checked in checkbox.
        vm.removeItem = function() {
            var newProductList = [];
            vm.selectedAll = false;
            angular.forEach(vm.merchandises, function(product) {
                if (!product.selected) {
                    newProductList.push(product);
                };
            });
            vm.merchandises = newProductList;
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

        console.log(vm.customerInfo);
        console.log(vm.bolInfo);

        vm.Id = function() {

            var date = new Date();

            var d = (date.getDate()).toString();
            var m = (date.getMonth() + 1).toString();
            var y = date.getFullYear().toString();
            var h = date.getHours().toString();
            var min = date.getMinutes().toString();
            var sec = date.getSeconds().toString();
            var Id = "SQ1NT" + d + m + y + h + min + sec;
            vm.bolInfo.BolId = Id;
            return Id;
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

        vm.branchInfo = [{
                Id: 1,
                Name: 'Ngọc Trang Q1',
                Address: '265G Phạm Ngũ Lão, Quận 1',
                Description: 'Sài Gòn'
            },
            {
                Id: 2,
                Name: 'Ngọc Trang Q5',
                Address: '265G Nguyễn Biểu, Quận 5',
                Description: 'Sài Gòn'
            },
            {
                Id: 3,
                Name: 'Ngọc Trang QTB',
                Address: '364 Cộng Hòa, Quận Tân Bình',
                Description: 'Sài Gòn'
            }, {
                Id: 4,
                Name: 'Ngọc Trang Nha Trang',
                Address: '364 Cộng Hòa, Quận Ninh Hưng',
                Description: 'Nha Trang'
            }, {
                Id: 5,
                Name: 'Ngọc Trang Cam Ranh',
                Address: '966 Nguyễn Hồ, Cam Ranh',
                Description: 'Cam Ranh'
            }, {
                Id: 6,
                Name: 'Ngọc Trang Hà Nội',
                Address: '16 Trần Duy Hưng, Quận Hoàng Mai',
                Description: 'Hà Nội'
            }
        ]
    }
})();