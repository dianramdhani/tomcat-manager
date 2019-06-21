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

    _.$inject = ['$stateParams', '$timeout', '$scope', '$compile', 'AMQManagerService', 'DTOptionsBuilder', 'DTColumnBuilder'];
    function _($stateParams, $timeout, $scope, $compile, AMQManagerService, DTOptionsBuilder, DTColumnBuilder) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $scope.dtOptions = DTOptionsBuilder
                .newOptions()
                .withOption('ajax', AMQManagerService.amqQueueShow($stateParams.amqId))
                .withDataProp('data')
                .withOption('processing', true)
                .withOption('serverSide', true)
                .withOption('createdRow', (row, data, dataIndex) => {
                    $compile(angular.element(row).contents())($scope);
                })
                .withOption('lengthMenu', [5, 10, 20])
                .withPaginationType('simple_numbers')
                .withLanguage({
                    oPaginate: {
                        sNext: '<i class="fa fa-angle-right"></i>',
                        sPrevious: '<i class="fa fa-angle-left"></i>'
                    }
                });
            $scope.dtColumns = [
                DTColumnBuilder.newColumn(0).withTitle('Name'),
                DTColumnBuilder.newColumn(1).withTitle('Queue'),
                DTColumnBuilder.newColumn(2).withTitle('Consumer'),
                DTColumnBuilder.newColumn(3).withTitle('Enqueue'),
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