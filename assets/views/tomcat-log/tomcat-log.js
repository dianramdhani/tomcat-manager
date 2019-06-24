(function () {
    'use strict';

    // Usage:
    // Tomcat log table.
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('tomcatLog', {
            template: require('./tomcat-log.html'),
            controller: _
        });

    _.$inject = ['$scope', '$stateParams', 'UtilService', 'DTColumnBuilder', 'ManagerService'];
    function _($scope, $stateParams, UtilService, DTColumnBuilder, ManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.dtOptions = UtilService.DTOptionsCreator(ManagerService.datatableInstanceLog($stateParams.agentId));
            $scope.dtColumns = [
                DTColumnBuilder.newColumn(0).withTitle('Log Activity'),
                DTColumnBuilder.newColumn(1).withTitle('Log Message'),
                DTColumnBuilder.newColumn(2).withTitle('Log Time'),
                DTColumnBuilder.newColumn(3).withTitle('Instance'),
                DTColumnBuilder.newColumn(4).withTitle('User')
            ];
        };
    }
})();