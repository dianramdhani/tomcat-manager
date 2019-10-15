(function () {
    'use strict';

    window.app
        .service('WorkManagerService', WorkManagerService);

    WorkManagerService.$inject = ['$http', 'CONFIG', 'UtilService'];
    function WorkManagerService($http, CONFIG, UtilService) {
        this.listAllWorkManager = listAllWorkManager;
        this.getWorkmanagerInstanceByWorkmanagerId = getWorkmanagerInstanceByWorkmanagerId;
        this.getWorkManagerByWorkManagerId = getWorkManagerByWorkManagerId;
        this.updateWorkmanagerByWorkmanagerId = updateWorkmanagerByWorkmanagerId;
        this.addWorkManager = addWorkManager;

        const url = `${CONFIG.API}`;

        // /manager/workmanager/list/{offset}/{limit}
        function listWorkManager(offset, limit) {

        }

        function getWorkManagerByWorkManagerId(workManagerId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/workmanager/${workManagerId}`));
        }

        // /manager/workmanager/listAll
        function listAllWorkManager() {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/workmanager/listAll`));
        }

        // /manager/workmanager/add
        function addWorkManager(workManager) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/workmanager/add`, workManager));
        }

        function updateWorkmanagerByWorkmanagerId(workManager) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/workmanager/update/${workManager.workManagerId}`, {
                maxIdleTime: workManager.maxIdleTime,
                maxQueueSize: workManager.maxQueueSize,
                maxThreads: workManager.maxThreads,
                minThreads: workManager.minThreads,
                name: workManager.name,
                namePrefix: workManager.namePrefix
            }));
        }

        function getWorkmanagerInstanceByWorkmanagerId(workManagerId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/workmanager/getWorkmanagerInstanceByWorkmanagerId/${workManagerId}`));
        }

        // /manager/workmanager/listAllWorkmanagerInstance
        function listAllWorkmanagerInstance() {

        }

        // /manager/workmanager/addTarget/{instanceId}/{workmanagerId}
        function addTarget(instanceId, workManagerId) {

        }
    }
})();