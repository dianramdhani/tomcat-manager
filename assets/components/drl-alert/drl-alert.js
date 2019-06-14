(function () {
    'use strict';

    // Usage:
    // Alert with modal mode.
    // Creates:
    // Use UtilService.drlAlert.

    window.app
        .component('drlAlert', {
            template: require('./drl-alert.html'),
            controller: drl,
            bindings: {
                type: '@',
                title: '@',
                body: '@',
                onClose: '&'
            },
        });

    drl.$inject = ['$scope', '$element'];
    function drl($scope, $element) {
        let $ctrl = this;

        $scope.onClose = () => {
            $ctrl.onClose();
            $element.remove();
        };
    }
})();