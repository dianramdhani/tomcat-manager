(function () {
    'use strict';

    window.app
        .service('WorkManagerService', WorkManagerService);

    WorkManagerService.$inject = ['$http', 'CONFIG', 'UtilService'];
    function WorkManagerService($http, CONFIG, UtilService) {
        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        // /manager/workmanager/list/{offset}/{limit}
        function listWorkManager(offset, limit) {

        }

        // /manager/workmanager/{workManagerId}
        function getWorkManagerByWorkManagerId(workManagerId) {

        }

        // /manager/workmanager/listAll
        function listAllWorkManager() {

        }

        // /manager/workmanager/add
        function addWorkManager() {

        }

        // /manager/workmanager/update/{targetWorkmanagerId}
        function updateWorkmanagerByWorkmanagerId(targetWorkmanagerId) {

        }

        // /manager/workmanager/getWorkmanagerInstanceByWorkmanagerId/{workManagerId}
        function getWorkmanagerInstanceByWorkmanagerId(workManagerId) {

        }

        // /manager/workmanager/listAllWorkmanagerInstance
        function listAllWorkmanagerInstance() {

        }

        // /manager/workmanager/addTarget/{instanceId}/{workmanagerId}
        function addTarget(instanceId, workManagerId) {

        }
    }
})();