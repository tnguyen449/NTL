(function() {
    'use strict';

    angular.module('BlurAdmin.pages.form')
        .controller('WizardCtrl', WizardCtrl);

    /** @ngInject */
    function WizardCtrl($scope) {
        var vm = this;

        vm.personalInfo = {};
        vm.productInfo = {};
        vm.shipment = {};

        vm.arePersonalInfoPasswordsEqual = function() {
            return vm.personalInfo.confirmPassword && vm.personalInfo.password == vm.personalInfo.confirmPassword;
        };
        vm.Id = function() {

            var date = new Date();

            var d = (date.getDate()).toString();
            var m = (date.getMonth() + 1).toString();
            var y = date.getFullYear().toString();
            var h = date.getHours().toString();
            var min = date.getMinutes().toString();
            var sec = date.getSeconds().toString();
            return "SQ1NT" + d + m + y + h + min + sec;
        }

    }
})();