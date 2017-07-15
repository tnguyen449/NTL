(function() {
    'use strict';

    angular.module('BlurAdmin.pages.form', ).controller('WizardCtrl', WizardCtrl);

    /** @ngInject */
    function WizardCtrl($scope, $http) {
        var vm = this;
        //view model from API init
        vm.transactionVM = {};
        vm.customerInfoVM = {};
        vm.branchInfoVM = {};
        vm.deliveryTypeVM = {};
        vm.merchandiseTypeVM = {};
        vm.serverTimeStampVM = "";
        vm.deliveryTypeVM = {};
        vm.merchandisesVM = [{
            //Init first empty row SmartTable
            id: 1,
            type: {
                name: null,
                calculationUnit: 0,
                value: 0
            },
            quantity: null,
            amount: null,
            isDeclaredValue: false,
            isBreakable: false,
            isSpecialPrice: false,
            declareValue: null,
            specialPrice: null,
            description: null,
            total: 0,
            //end init
            //init checkbox properties for each row
            isDeclareDisabled: true,
            isSpecialDisabled: true
                //end init
        }];
        //end init
        //vm for Views init
        vm.dateOptions = {
            formatYear: 'yyyy',
            maxDate: new Date(2099, 12, 31),
            minDate: new Date(),
            startingDay: 1
        };
        vm.bolInfoVM = {
            bolFrom: 0,
            bolTo: 0,
            sender: 0,
            receiver: 0,
            isGuarantee: false,
            discount: 0,
            statusId: 0,
            total: null,
            createdDate: vm.dateOptions.minDate,
            createdBy: "",
            barcode: "",
            premium: "",
            description: "",
            deliveryType: 0,
            prepaid: null,
            liabilities: null
        };

        vm.shipment = {};
        vm.guarantee = false;
        vm.showIdInput = false;
        vm.SenderIdNumber = null;
        //end vm init

        //Method 
        //script for check Gurantee check box

        //script for check Price Declaration check box     
        vm.toggleDeclareValueInput = function(item) {
            if (item.isDeclaredValue == true) {
                item.isDeclareDisabled = false;
            } else {
                item.isDeclareDisabled = true;
                item.declareValue = null;
            }
        };
        vm.toggleSpecialPriceInput = function(item) {
            if (item.isSpecialPrice == true) {
                item.isSpecialDisabled = false;
            } else {
                item.isSpecialDisabled = true;
                item.specialPrice = null;
            }
        };
        //Add items in bill of landing
        vm.addItem = function() {
            vm.inserted = {
                id: vm.merchandisesVM.length + 1,
                type: null,
                quantity: null,
                amount: null,
                isDeclaredValue: false,
                isBreakable: false,
                isSpecialPrice: false,
                declareValue: null,
                specialPrice: null,
                description: null,
                total: null,
                isDeclareDisabled: true,
                isSpecialDisabled: true
            };
            vm.merchandisesVM.push(vm.inserted);
        };
        //Remove items that are checked in checkbox.
        vm.removeItem = function() {
            var newProductList = [];
            vm.selectedAll = false;
            angular.forEach(vm.merchandisesVM, function(product) {
                if (product.selected) {
                    newProductList.push(product);
                };
            });
            vm.merchandisesVM = newProductList;
        };
        //Select all items in checkbox
        vm.selectAll = function() {
            if (!vm.selectedAll) {
                vm.selectedAll = false;
            } else {
                vm.selectedAll = true;
            };
            angular.forEach(vm.merchandisesVM, function(product) {
                product.selected = vm.selectedAll;
            });
        };

        //script for date picker      
        vm.pickDate = function() {
            vm.popUpDate.opened = true;
        };
        vm.setDate = function(day, month, year) {
            vm.dt = new Date(day, month, year);
        };
        vm.popUpDate = {
            opened: false
        };
        //Load component from API
        vm.getTransactionComponent = function() {
            if (vm.branchInfoVM.length == undefined && vm.merchandiseTypeVM.length == undefined && vm.deliveryTypeVM.length == undefined) {
                $http.get('http://localhost:57363/NgocTrang/Api/Bol/GetComponent').then(
                    function(response) {
                        if (response.data.Branch.length > 0 && response.data.Type.length > 0) {
                            vm.branchInfoVM = response.data.Branch;
                            vm.merchandiseTypeVM = response.data.Type;
                            vm.serverTimeStampVM = response.data.CurrentTimeStamp;
                            vm.deliveryTypeVM = response.data.DeliveryType;
                        }
                    },
                    function(response) {
                        vm.branchInfoVM = [{
                            'Name': 'Lỗi từ máy chủ',
                            'Description': 'Không thể tải danh sách chi nhánh'
                        }];
                        vm.merchandiseTypeVM = [{
                            'Name': 'Lỗi từ máy chủ',
                            'Description': 'Không thể tải danh sách loại hàng'
                        }];
                        vm.deliveryTypeVM = "Lỗi từ máy chủ";
                    }
                )
            }
        };
        //Create BolId
        vm.createGUId = function() {
            return vm.serverTimeStampVM;
        };
        //Calculate
        vm.calculateBolTotal = function() {
            vm.bolInfoVM.total = 0;
            angular.forEach(vm.merchandisesVM, function(item) {
                vm.bolInfoVM.total = vm.bolInfoVM.total + item.total;
            });
        };
        vm.calculateBolLiabilities = function() {
            vm.bolInfoVM.liabilities = vm.bolInfoVM.total - vm.bolInfoVM.prepaid;
        }
        vm.calculate = function(item) {
            item.total = item.type.Value * item.quantity;
            vm.calculateBolTotal()
        };

        vm.test = function(item) {
                console.log(item);
            }
            //End    
            // script for configure selectize options
        vm.tagsConfig = {
            persist: false,
            selectOnTab: true,
            labelField: 'name',
            valueField: 'id',
            sortField: 'name',
            searchField: 'name'
                // labelField: 'vm.branchInfoVM.Name',
                // valueField: 'vm.branchInfoVM.bracnkId',
                // sortField: 'vm.branchInfoVM.Description',
                // searchField: 'vm.branchInfoVM.Name'
        };

        // vm.tagsSelectize('clearOptions');

        vm.tags_options = function() {
            return [
                { id: 1, name: 'The user 1' },
                { id: 2, name: 'The user 2' },
                { id: 3, name: 'The user 3' }
            ];
        };
    }
})();