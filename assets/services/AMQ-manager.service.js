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
        this.updateAmq = updateAmq;
        this.checkConnection = checkConnection;
        this.createAmq = createAmq;
        this.deleteAmq = deleteAmq;

        const url = `${CONFIG.API}`;

        function createAmq(amq) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/amq/add/`, {
                instanceAmqName: amq.instanceAmqName,
                instanceAmqAddress: amq.instanceAmqAddress,
                instanceAmqJmxPort: amq.instanceAmqJmxPort,
                instanceAmqJmxUname: amq.instanceAmqJmxUname,
                instanceAmqJmxPwd: amq.instanceAmqJmxPwd
            }));
        }

        function listAmq(offset, limit) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/amq/list/${offset}/${limit}`));
        }

        function showAmq(amqId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/amq/${amqId}/show`));
        }

        function updateAmq(amq) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/amq/update/`, {
                instanceAmqId: amq.instanceAmqId,
                instanceAmqName: amq.instanceAmqName,
                instanceAmqAddress: amq.instanceAmqAddress,
                instanceAmqJmxPort: amq.instanceAmqJmxPort,
                instanceAmqJmxUname: amq.instanceAmqJmxUname,
                instanceAmqJmxPwd: amq.instanceAmqJmxPwd
            }));
        }

        function deleteAmq(amqId) {
            return UtilService.showAlertWhenError($http.delete(`${url}/manager/amq/${amqId}/delete`));
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

        function checkConnection(amq) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/amq/connection/check`, {
                instanceAmqName: amq.instanceAmqName,
                instanceAmqAddress: amq.instanceAmqAddress,
                instanceAmqJmxPort: amq.instanceAmqJmxPort,
                instanceAmqJmxUname: amq.instanceAmqJmxUname,
                instanceAmqJmxPwd: amq.instanceAmqJmxPwd
            }));
        }
    }
})();