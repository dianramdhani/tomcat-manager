(function () {
    'use strict';

    // Usage:
    // Reusable confirm.
    // Creates:
    // Call by UtilService.confirm.

    window.app
        .component('drlConfirm', {
            template: require('./drl-confirm.html'),
            controller: drl,
            transclude: true,
            bindings: {
                yesFn: '&',
                noFn: '&'
            },
        });

    drl.$inject = ['$scope', '$timeout', '$element'];
    function drl($scope, $timeout, $element) {
        let $ctrl = this,
            confirmElement;
        $ctrl.$onInit = () => {
            $timeout(() => {
                confirmElement = angular.element('#confirm');
                confirmElement
                    .modal('show')
                    .on('hidden.bs.modal', () => {
                        $element.remove();
                        $ctrl.noFn();
                    });
            });
        };

        $scope.yesFn = () => {
            $ctrl.yesFn();
            confirmElement.modal('hide');
        };
    }
})();