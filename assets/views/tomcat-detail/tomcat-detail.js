(function () {
    'use strict';

    // Usage:
    // Tomcat detail container
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('tomcatDetail', {
            template: require('./tomcat-detail.html'),
            controller: _,
            bindings: {
                instance: '='
            }
        });

    _.$inject = ['$scope', '$stateParams', '$state', 'UtilService', 'ManagerService'];
    function _($scope, $stateParams, $state, UtilService, ManagerService) {
        let $ctrl = this;

        $scope.delete = () => {
            UtilService.drlConfirm(`Are you sure want to delete ${$ctrl.instance.instanceAgentId.agentName}?`, async () => {
                UtilService.drlLoading(true);
                await ManagerService.deleteAgent($stateParams.agentId);
                window.location.href = '/';
                UtilService.drlLoading(false);
            });
        };

        $scope.start = () => {
            UtilService.drlConfirm(`Are you sure want to start ${$ctrl.instance.instanceAgentId.agentName}?`, async () => {
                UtilService.drlLoading(true);
                await ManagerService.startAgent($stateParams.agentId);
                window.location.href = '/';
                UtilService.drlLoading(false);
            });
        };

        $scope.stop = () => {
            UtilService.drlConfirm(`Are you sure want to stop ${$ctrl.instance.instanceAgentId.agentName}?`, async () => {
                UtilService.drlLoading(true);
                ManagerService.stopAgent($stateParams.agentId);
                window.location.href = '/';
                UtilService.drlLoading(false);
            });
        };
    }
})();