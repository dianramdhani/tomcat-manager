(function () {
    'use strict';

    // Usage:
    // Tomcat instance information.

    window.app
        .component('tomcatInstance', {
            template: require('./tomcat-instance.html'),
            controller: _
        });

    _.$inject = ['$stateParams', '$scope', '$timeout', 'ManagerService', 'UtilService'];
    function _($stateParams, $scope, $timeout, ManagerService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let instance = await ManagerService.showInstanceByAgentId($stateParams.agentId).then(_ => _.data.object),
                    instanceCpuLineChart = await ManagerService.instanceCpuLineChart($stateParams.agentId).then(_ => _.data.object),
                    instancePhysicalMemoryChart = await ManagerService.instancePhysicalMemoryChart($stateParams.agentId).then(_ => _.data.object),
                    instanceHeapMemoryChart = await ManagerService.instanceHeapMemoryChart($stateParams.agentId).then(_ => _.data.object);
                instance['health'] = await ManagerService.checkAgentHealth($stateParams.agentId).then(_ => _.data.object);
                return {
                    instance,
                    instanceCpuLineChart,
                    instancePhysicalMemoryChart,
                    instanceHeapMemoryChart
                };
            };

            UtilService.drlLoading(true);
            getInitialData().then(({ instance, instanceCpuLineChart, instancePhysicalMemoryChart, instanceHeapMemoryChart }) => {
                $timeout(() => {
                    $scope.instance = instance;
                    UtilService.drlLoading(false);
                });
                console.log({ instance, instanceCpuLineChart, instancePhysicalMemoryChart, instanceHeapMemoryChart });
            });
        };
    }
})();