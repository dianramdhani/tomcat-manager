(function () {
    'use strict';

    window.app
        .service('WorkManagerService', WorkManagerService);

    WorkManagerService.$inject = ['$http', 'CONFIG', 'UtilService'];
    function WorkManagerService($http, CONFIG, UtilService) {
        this.listAllWorkManager = listAllWorkManager;
        this.getWorkmanagerInstanceByWorkmanagerId = getWorkmanagerInstanceByWorkmanagerId;
        this.getWorkManagerByWorkManagerId = getWorkManagerByWorkManagerId;

        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        // /manager/workmanager/list/{offset}/{limit}
        function listWorkManager(offset, limit) {

        }

        // /manager/workmanager/{workManagerId}
        function getWorkManagerByWorkManagerId(workManagerId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/workmanager/${workManagerId}`));
        }

        // /manager/workmanager/listAll
        function listAllWorkManager() {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/workmanager/listAll`));
        }

        // /manager/workmanager/add
        function addWorkManager() {

        }

        // /manager/workmanager/update/{targetWorkmanagerId}
        function updateWorkmanagerByWorkmanagerId(targetWorkmanagerId) {

        }

        // /manager/workmanager/getWorkmanagerInstanceByWorkmanagerId/{workManagerId}
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