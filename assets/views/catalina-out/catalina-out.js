(function () {
    'use strict';

    // Usage:
    // Catalina log output display.
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('catalinaOut', {
            template: require('./catalina-out.html'),
            controller: _,
            bindings: {
                log: '<',
            },
        });

    _.$inject = ['$scope'];
    function _($scope) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.log = '';
            angular.forEach($ctrl.log.reverse(), (log) => {
                $scope.log = `${$scope.log}${log.line}\n`;
            });
        };
    }
})();