(function () {
    'use strict';

    // Usage:
    // AMQ instance container.

    window.app
        .component('amqInstance', {
            template: require('./amq-instance.html'),
            controller: _
        });

    _.$inject = ['$stateParams', '$timeout', '$scope', '$log', 'AMQManagerService'];
    function _($stateParams, $timeout, $scope, $log, AMQManagerService) {
        var $ctrl = this;
        $scope.$log = $log;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let amq = await AMQManagerService.showAmq($stateParams.amqId).then(_ => _.data.object);
                amq['health'] = await AMQManagerService.checkAgentHealth($stateParams.amqId).then(_ => _.data.object);
                return { amq };
            }

            getInitialData().then(({ amq }) => {
                $timeout(() => {
                    $scope.amq = amq;
                });
            });
        };
    }
})();