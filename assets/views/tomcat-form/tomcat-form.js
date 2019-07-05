(function () {
    'use strict';

    // Usage:
    // Form for adding tomcat instance.

    window.app
        .component('tomcatForm', {
            template: require('./tomcat-form.html'),
            controller: _
        });

    _.$inject = ['$scope', '$stateParams', '$timeout', '$state', 'ManagerService', 'UtilService'];
    function _($scope, $stateParams, $timeout, $state, ManagerService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
            * Get initial data.
            */
            const getInitialData = async () => {
                let agent = {
                    agentPort: 8080,
                    instanceShutdownPort: 8085,
                    instanceAJPPort: 8009,
                    instanceRedirectPort: 8443,
                    instanceJVMArgs: '-Xmx512m'
                }, canUpdate = $stateParams.agentId !== null;
                if (canUpdate) {
                    agent = await ManagerService.showInstanceByAgentId($stateParams.agentId).then(_ => _.data.object);
                    agent['agentName'] = agent.instanceAgentId.agentName;
                    agent['agentPort'] = agent.instanceConnectorPort;
                    console.log({ agent, canUpdate });
                }
                return [agent, canUpdate];
            };

            $timeout(async () => {
                [$scope.agent, $scope.canUpdate] = await getInitialData();
                $scope.$apply();
            });
        };

        $scope.save = async () => {
            UtilService.drlLoading(true);
            let res;
            if ($scope.canUpdate) {
                res = await ManagerService.updateAgent($scope.agent);
                $state.reload();
            } else {
                res = await ManagerService.createAgent($scope.agent);
                $state.reload();
            }
            UtilService.drlLoading(false);
            console.log($scope.agent, { res });
        };
    }
})();