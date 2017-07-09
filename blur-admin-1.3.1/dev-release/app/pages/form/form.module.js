/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';

    angular.module('BlurAdmin.pages.form', ['ui.select', 'ngSanitize'])
        .config(routeConfig);

    /** @ngInject */
    function routeConfig($stateProvider) {
        $stateProvider
            .state('form', {
                url: '/donvan',
                template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
                abstract: true,
                title: 'Quản Lý Đơn Vận',
                sidebarMeta: {
                    icon: 'ion-compose',
                    order: 250,
                },
            })
            .state('form.wizard', {
                url: '/them',
                templateUrl: 'app/pages/form/wizard/wizard.html',
                controller: 'WizardCtrl',
                controllerAs: 'vm',
                title: 'Thêm Mới Đơn Vận',
                sidebarMeta: {
                    order: 200,
                },
            })
            .state('form.inputs', {
                url: '/sua',
                templateUrl: 'app/pages/form/inputs/inputs.html',
                title: 'Chỉnh Sửa Đơn Vận',
                sidebarMeta: {
                    order: 0,
                },
            })
            // .state('form.layouts', {
            //   url: '/Xem Đơn Vận ',
            //   templateUrl: 'app/pages/form/layouts/layouts.html',
            //   title: 'Form Layouts',
            //   sidebarMeta: {
            //     order: 100,
            //   },
            // })

    }
})();