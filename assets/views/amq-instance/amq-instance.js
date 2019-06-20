(function () {
    'use strict';

    // Usage:
    // AMQ instance container.

    window.app
        .component('amqInstance', {
            template: require('./amq-instance.html'),
            controller: _
        });

    _.$inject = ['$stateParams', '$timeout', '$scope', 'AMQManagerService'];
    function _($stateParams, $timeout, $scope, AMQManagerService) {
        var $ctrl = this;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let amq = await AMQManagerService.showAmq($stateParams.amqId).then(_ => _.data.object),
                    amqQueue;

                amq['health'] = await AMQManagerService.checkAgentHealth($stateParams.amqId).then(_ => _.data.object);
                if (amq.health.jmxConnected === 'true') {
                    amqQueue = await AMQManagerService.amqQueueShow($stateParams.amqId).then(_ => _.data);
                }

                return {
                    amq,
                    amqQueue
                };
            }

            getInitialData().then(({ amq, amqQueue }) => {
                $timeout(() => {
                    $scope.amq = amq;
                    $scope.amqQueue = amqQueue;
                });
                console.log({ amq, amqQueue });
            });
        };
    }
})();