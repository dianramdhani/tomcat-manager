(function () {
    'use strict';

    // Usage:
    // Tomcat instance information.

    window.app
        .component('tomcatInstance', {
            template: require('./tomcat-instance.html'),
            controller: _
        });

    _.$inject = ['$stateParams', '$scope', 'ManagerService'];
    function _($stateParams, $scope, ManagerService) {
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
                return {
                    instance,
                    instanceCpuLineChart,
                    instancePhysicalMemoryChart,
                    instanceHeapMemoryChart
                };
            };

            getInitialData().then(res => {
                console.log(res);
            });
        };
    }
})();