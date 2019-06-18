(function () {
    'use strict';

    window.app
        .service('ManagerService', ManagerService);

    ManagerService.$inject = ['$http', 'CONFIG', 'UtilService'];
    function ManagerService($http, CONFIG, UtilService) {
        this.listAgent = listAgent;
        this.listGroupInstance = listGroupInstance;
        this.checkAgentHealth = checkAgentHealth;
        this.showInstanceByAgentId = showInstanceByAgentId;
        this.instanceCpuLineChart = instanceCpuLineChart;
        this.instancePhysicalMemoryChart = instancePhysicalMemoryChart;
        this.instanceHeapMemoryChart = instanceHeapMemoryChart;

        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        // /manager/agent/add/
        function createAgent() {

        }

        // /manager/agent/{agentId}/show
        function showAgent(agentId) {

        }

        // /manager/agent/{agentId}/health
        function checkAgentHealth(agentId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/agent/${agentId}/health`));
        }

        // /manager/agent/list/{offset}/{limit}
        function listAgent(offset, limit) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/agent/list/${offset}/${limit}`));
        }

        // /manager/agent/{agentId}/delete
        function deleteAgent(agentId) {

        }

        // /manager/instance/list/{offset}/{limit}
        function listInstance(offset, limit) {

        }

        // /manager/agent/update/
        function updateAgent() {

        }

        // /manager/instance/{instanceId}/deployments/show/{offset}/{limit}
        function showDeployment(instanceId, offset, limit) {

        }

        // /manager/instance/{instanceId}/deployments/showMap/{offset}/{limit}
        function showMapDeployment(instanceId, offset, limit) {

        }

        // /manager/agent/{agentId}/action/restartWar/{contextName}
        function actionRestartDeployment(agentId, contextName) {

        }

        // /manager/agent/{agentId}/action/stopWar/{contextName}
        function actionStopDeployment(agentId, contextName) {

        }

        // /manager/agent/{agentId}/action/startWar/{contextName}
        function actionStartDeployment(agentId, contextName) {

        }

        // /manager/agent/{agentId}/action/deploy
        function actionDeploy(agentId) {

        }

        // /manager/agent/{agentId}/action/undeploy/{contextName}
        function actionUndeploy(agentId, contextName) {

        }

        // /manager/agent/{agentId}/action/{instanceAction}
        function agentAction(agentId, instanceAction) {

        }

        // /manager/agent/credential/list/
        function listCredential() {

        }

        // /manager/instance/action/list/{serverStatus}/{offset}/{limit}
        function actionList(serverStatus, offset, limit) {

        }

        // /manager/instance/{agentId}/show/
        function showInstanceByAgentId(agentId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/instance/${agentId}/show/`));
        }

        // /manager/instance/{agentId}/log/show
        function datatableInstanceLog(agentId) {

        }

        // /manager/instance/{agentId}/chart/cpuline/show
        function instanceCpuLineChart(agentId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/instance/${agentId}/chart/cpuline/show`));
        }

        // /manager/instance/{agentId}/charts/physicalmem/show
        function instancePhysicalMemoryChart(agentId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/instance/${agentId}/charts/physicalmem/show`));
        }

        // /manager/instance/{agentId}/charts/heapmemory/show
        function instanceHeapMemoryChart(agentId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/instance/${agentId}/charts/heapmemory/show`));
        }

        // /manager/deployment/{deploymentId}/charts/heapmemory/show
        function deploymentHeapMemoryChart(deploymentId) {

        }

        // /manager/agent/group/{groupId}/add/instance/
        function addInstanceToGroup(groupId) {

        }

        // /manager/agent/group/{groupId}/delete/instance/{instanceId}
        function deleteInstanceFromGroup(groupId, instanceId) {

        }

        // /manager/agent/group/add
        function addGroupInstance() {

        }

        // /manager/agent/group/list/{page}/{size}
        function listGroupInstance(page, size) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/agent/group/list/${page}/${size}`));
        }

        // /manager/agent/group/show/{groupId}
        function showGroupInstance(groupId) {

        }

        // /manager/agent/group/{groupId}/list/instance/{page}/{size}
        function showInstanceByGroupId(groupId, page, size) {

        }

        // /manager/agent/group/{groupId}/delete
        function deleteInstanceGroup(groupId) {

        }

        // /manager/agent/{agentId}/tail-log/{logIdx}
        function tailLogAgent(agentId, logIdx) {

        }
    }
})();