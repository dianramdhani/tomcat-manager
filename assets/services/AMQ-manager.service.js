(function () {
    'use strict';

    window.app
        .service('AMQManagerService', AMQManagerService);

    AMQManagerService.$inject = ['$http', 'CONFIG', 'UtilService'];
    function AMQManagerService($http, CONFIG, UtilService) {
        this.listAmq = listAmq;
        this.checkAgentHealth = checkAgentHealth;
        this.showAmq = showAmq;
        this.amqQueueShow = amqQueueShow;

        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        function listAmq(offset, limit) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/amq/list/${offset}/${limit}`));
        }

        function showAmq(amqId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/amq/${amqId}/show`));
        }

        // /manager/amq/update/
        function updateAmq() {

        }

        // /manager/amq/{amqId}/delete
        function deleteAmq(amqId) {

        }

        function amqQueueShow(amqId) {
            return {
                url: `${url}/manager/amq/${amqId}/queue/show`,
                beforeSend: (xhr) => {
                    xhr.setRequestHeader('Authorization', $http.defaults.headers.common.Authorization);
                },
                cache: false
            }
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

        function checkAgentHealth(amqId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/amq/${amqId}/health`));
        }

        // /manager/amq/connection/check
        function checkConnection() {

        }
    }
})();