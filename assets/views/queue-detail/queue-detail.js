(function () {
    'use strict';

    // Usage:
    // Table queue AMQ container.
    // Creates:
    // Call by amq-instance component.

    window.app
        .component('queueDetail', {
            template: require('./queue-detail.html'),
            controller: _
        });

    _.$inject = ['$stateParams', '$scope', 'AMQManagerService', 'UtilService', 'DTColumnBuilder'];
    function _($stateParams, $scope, AMQManagerService, UtilService, DTColumnBuilder) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.dtOptions = UtilService.DTOptionsCreator(AMQManagerService.amqQueueShow($stateParams.amqId), $scope);
            $scope.dtColumns = [
                DTColumnBuilder.newColumn(0).withTitle('Name').notSortable(),
                DTColumnBuilder.newColumn(1).withTitle('Queue').notSortable(),
                DTColumnBuilder.newColumn(2).withTitle('Consumer').notSortable(),
                DTColumnBuilder.newColumn(3).withTitle('Enqueue').notSortable(),
                DTColumnBuilder.newColumn(null).withTitle('Operation').notSortable().renderWith((data, type, full, meta) => {
                    return `
                        <button class="btn btn-sm btn-oblong btn-primary" ng-click="purge('${data[0]}')">Purge</button>
                        <button class="btn btn-sm btn-oblong btn-danger" ng-click="delete('${data[0]}')">Delete</button>
                    `;
                })
            ];
        };

        $scope.purge = (name) => {
            console.log('purge', name);
        };

        $scope.delete = (name) => {
            console.log('delete', name);
        };
    }
})();