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
                let res = await ManagerService.deleteAgent($stateParams.agentId);
                if (res.status === 200) {
                    $state.reload();
                }
                UtilService.drlLoading(false);
            });
        };
    }
})();