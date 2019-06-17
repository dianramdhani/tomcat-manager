(function () {
    'use strict';

    window.app
        .service('AMQManagerService', AMQManagerService);

    AMQManagerService.$inject = [];
    function AMQManagerService() {
        // /manager/amq/list/{offset}/{limit}
        function listAmq(offset, limit) {

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

        }

        // /manager/amq/connection/check
        function checkConnection() {

        }
    }
})();