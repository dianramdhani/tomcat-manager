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
        this.tailLogAgent = tailLogAgent;
        this.datatableInstanceLog = datatableInstanceLog;
        this.showMapDeployment = showMapDeployment;
        this.listAllInstances = listAllInstances;
        this.listCredential = listCredential;
        this.actionDeploy = actionDeploy;
        this.actionStopDeployment = actionStopDeployment;
        this.actionStartDeployment = actionStartDeployment;
        this.actionUndeploy = actionUndeploy;
        this.actionRestartDeployment = actionRestartDeployment;
        this.createAgent = createAgent;
        this.updateAgent = updateAgent;
        this.deleteAgent = deleteAgent;
        this.startAgent = startAgent;
        this.stopAgent = stopAgent;

        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        function createAgent(agent) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/agent/add/`, agent));
        }

        // /manager/agent/{agentId}/show
        function showAgent(agentId) {

        }

        function checkAgentHealth(agentId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/agent/${agentId}/health`));
        }

        function listAgent(offset, limit) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/agent/list/${offset}/${limit}`));
        }

        function deleteAgent(agentId) {
            return UtilService.showAlertWhenError($http.delete(`${url}/manager/agent/${agentId}/delete`));
        }

        // /manager/instance/list/{offset}/{limit}
        function listInstance(offset, limit) {

        }

        function listAllInstances(offset, limit) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/instance/listAll/${offset}/${limit}`));
        }

        function updateAgent(agent) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/agent/update/`, {
                agentId: agent.instanceId,
                agentName: agent.agentName,
                instanceJVMArgs: agent.instanceJVMArgs,
                instanceConnectorPort: agent.instanceConnectorPort,
                instanceShutdownPort: agent.instanceShutdownPort,
                instanceAJPPort: agent.instanceAJPPort,
                instanceRedirectPort: agent.instanceRedirectPort
            }));
        }

        // /manager/instance/{instanceId}/deployments/show/{offset}/{limit}
        function showDeployment(instanceId, offset, limit) {

        }

        function showMapDeployment(instanceId, offset, limit) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/instance/${instanceId}/deployments/showMap/${offset}/${limit}`));
        }

        function actionRestartDeployment(agentId, contextName) {
            return $http.get(`${url}/manager/agent/${agentId}/action/restartWar/${contextName}`);
        }

        function actionStopDeployment(agentId, contextName) {
            return $http.get(`${url}/manager/agent/${agentId}/action/stopWar/${contextName}`);
        }

        function actionStartDeployment(agentId, contextName) {
            return $http.get(`${url}/manager/agent/${agentId}/action/startWar/${contextName}`);
        }

        function actionDeploy(agentId, deployment) {
            return $http.post(`${url}/manager/agent/${agentId}/action/deploy`, UtilService.objectToFormData(deployment), {
                transformResponse: angular.identity,
                headers: { 'Content-Type': undefined }
            });
        }

        function actionUndeploy(agentId, contextName) {
            return $http.get(`${url}/manager/agent/${agentId}/action/undeploy/${contextName}`);
        }

        // /manager/agent/{agentId}/action/{instanceAction}
        function agentAction(agentId, instanceAction) {

        }

        function listCredential() {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/agent/credential/list/`));
        }

        // /manager/instance/action/list/{serverStatus}/{offset}/{limit}
        function actionList(serverStatus, offset, limit) {

        }

        function showInstanceByAgentId(agentId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/instance/${agentId}/show/`));
        }

        function datatableInstanceLog(agentId) {
            return {
                url: `${url}/manager/instance/${agentId}/log/show`,
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', $http.defaults.headers.common.Authorization);
                },
                cache: false
            }
        }

        function instanceCpuLineChart(agentId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/instance/${agentId}/chart/cpuline/show`));
        }

        function instancePhysicalMemoryChart(agentId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/instance/${agentId}/charts/physicalmem/show`));
        }

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

        function tailLogAgent(agentId, logIdx) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/agent/${agentId}/tail-log/${logIdx}`));
        }

        function startAgent(agentId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/agent/${agentId}/action/start`));
        }

        function stopAgent(agentId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/agent/${agentId}/action/stop`));
        }
    }
})();