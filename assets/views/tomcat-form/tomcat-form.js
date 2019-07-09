(function () {
    'use strict';

    // Usage:
    // Form for adding tomcat instance.

    window.app
        .component('tomcatForm', {
            template: require('./tomcat-form.html'),
            controller: _
        });

    _.$inject = ['$scope', '$stateParams', '$timeout', 'ManagerService', 'UtilService'];
    function _($scope, $stateParams, $timeout, ManagerService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
            * Get initial data.
            */
            const getInitialData = async () => {
                let agent = {
                    instanceConnectorPort: 8080,
                    instanceShutdownPort: 8085,
                    instanceAJPPort: 8009,
                    instanceRedirectPort: 8443,
                    instanceJVMArgs: '-Xmx512m'
                }, canUpdate = $stateParams.agentId !== null;
                if (canUpdate) {
                    agent = await ManagerService.showInstanceByAgentId($stateParams.agentId).then(_ => _.data.object);
                    agent['agentName'] = agent.instanceAgentId.agentName;
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
            if ($scope.canUpdate) {
                await ManagerService.updateAgent($scope.agent);
                window.location.href = '/';
            } else {
                await ManagerService.createAgent($scope.agent);
                window.location.href = '/';
            }
            UtilService.drlLoading(false);
        };
    }
})();