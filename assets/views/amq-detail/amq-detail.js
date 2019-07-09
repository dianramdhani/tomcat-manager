(function () {
    'use strict';

    // Usage:
    // AMQ detail container.
    // Creates:
    // Call by amq-instance component.

    window.app
        .component('amqDetail', {
            template: require('./amq-detail.html'),
            controller: _,
            bindings: {
                amq: '='
            }
        });

    _.$inject = ['$scope', 'UtilService', 'AMQManagerService'];
    function _($scope, UtilService, AMQManagerService) {
        let $ctrl = this;

        $scope.delete = () => {
            UtilService.drlConfirm(`
                Are you sure to delete this AMQ instance? 
                <br>
                This action cannot be undone.
            `, async () => {
                    await AMQManagerService.deleteAmq($ctrl.amq.instanceAmqId);
                    window.location.href = '/';
                });
        };
    }
})();