(function () {
    'use strict';

    window.app
        .service('AMQManagerService', AMQManagerService);

    AMQManagerService.$inject = ['$http', 'CONFIG', 'UtilService'];
    function AMQManagerService($http, CONFIG, UtilService) {
        this.listAmq = listAmq;
        this.checkAgentHealth = checkAgentHealth;

        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        // /manager/amq/list/{offset}/{limit}
        function listAmq(offset, limit) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/amq/list/${offset}/${limit}`));
        }

        // /manager/amq/{amqId}/show
        function showAmq(amqId) {

        }

        // /manager/amq/update/
        function updateAmq() {

        }

        // /manager/amq/{amqId}/delete
        function deleteAmq(amqId) {

        }

        // /manager/amq/{amqId}/queue/show
        function amqQueueShow(amqId) {

        }

        // /manager/amq/{amqId}/queue/purge
        function amqQueuePurge(amqId) {

        }

        // /manager/amq/{amqId}/queue/delete
        function amqQueueDelete(amqId) {

        }

        // /manager/amq/{amqId}/queue/create
        function amqQueueCreate(amqId) {

        }

        // /manager/amq/{amqId}/health
        function checkAgentHealth(amqId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/amq/${amqId}/health`));
        }

        // /manager/amq/connection/check
        function checkConnection() {

        }
    }
})();