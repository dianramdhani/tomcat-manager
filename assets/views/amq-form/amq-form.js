(function () {
    'use strict';

    // Usage:
    // Form for add and update amq.
    // Creates:
    // Call by amq-instance component.

    window.app
        .component('amqForm', {
            template: require('./amq-form.html'),
            controller: _
        });

    _.$inject = ['$stateParams', '$scope', '$timeout', '$state', 'AMQManagerService', 'UtilService'];
    function _($stateParams, $scope, $timeout, $state, AMQManagerService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let canUpdate = $stateParams.amqId !== null,
                    amq;
                if (canUpdate) {
                    amq = await AMQManagerService.showAmq($stateParams.amqId).then(_ => _.data.object);
                }
                return [amq, canUpdate];
            };

            $timeout(async () => {
                [$scope.amq, $scope.canUpdate] = await getInitialData();
                $scope.$apply();
            });
        };

        $scope.save = async () => {
            let message;
            if ($scope.canUpdate) {
                message = await AMQManagerService.updateAmq($scope.amq).then(_ => _.data.message);
                UtilService.drlAlert('success', message);
                $state.go('admin.amqInstance', { amqId: $scope.amq.instanceAmqId });
            } else {
                const saveAmq = async () => {
                    message = await AMQManagerService.createAmq($scope.amq).then(_ => _.data.message);
                    UtilService.drlAlert('success', message);
                    $state.go('admin.dashboard');
                };

                let jmxConnected = await AMQManagerService.checkConnection($scope.amq).then(_ => _.data.object.jmxConnected);
                if (jmxConnected === 'false') {
                    UtilService.drlConfirm(`
                        Can't connect to AMQ Instance with this configuration! 
                        <br>
                        Are you sure you wan't to save this configuration?
                    `, saveAmq);
                } else {
                    saveAmq();
                }
            }
        };
    }
})();