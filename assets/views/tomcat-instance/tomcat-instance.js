(function () {
    'use strict';

    // Usage:
    // Tomcat instance information.

    window.app
        .component('tomcatInstance', {
            template: require('./tomcat-instance.html'),
            controller: _
        });

    _.$inject = ['$stateParams', '$scope', '$timeout', '$state', 'ManagerService', 'UtilService'];
    function _($stateParams, $scope, $timeout, $state, ManagerService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let instance = await ManagerService.showInstanceByAgentId($stateParams.agentId).then(_ => _.data.object);
                instance['health'] = await ManagerService.checkAgentHealth($stateParams.agentId).then(_ => _.data.object);
                return [instance];
            };

            $timeout(async () => {
                UtilService.drlLoading(true);
                [$scope.instance] = await getInitialData();
                $scope.$apply();
                UtilService.drlLoading(false);
                $state.go('admin.tomcatInstance.deploymentList');
                $scope.$watch(() => $state.$current.name, href => {
                    $scope.href = href;
                });
            });
        };
    }
})();