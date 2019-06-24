(function () {
    'use strict';

    // Usage:
    // Catalina log output display.
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('catalinaOut', {
            template: require('./catalina-out.html'),
            controller: _
        });

    _.$inject = ['$scope', '$stateParams', 'ManagerService'];
    function _($scope, $stateParams, ManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            ManagerService.tailLogAgent($stateParams.agentId, 1).then(res => {
                let log = res.data.object;
                $scope.log = '';
                angular.forEach(log.reverse(), (_log) => {
                    $scope.log = `${$scope.log}${_log.line}\n`;
                });
            });
        };
    }
})();