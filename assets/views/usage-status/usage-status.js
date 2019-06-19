(function () {
    'use strict';

    // Usage:
    // Usage status container.
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('usageStatus', {
            template: require('./usage-status.html'),
            controller: _,
            bindings: {
                chart: '=',
            }
        });

    _.$inject = ['$timeout'];
    function _($timeout) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $timeout(() => {
                angular.element('#firstChart').click();
            });
        };
    }
})();