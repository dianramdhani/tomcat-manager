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

    _.$inject = ['$stateParams', '$timeout', 'AMQManagerService'];
    function _($stateParams, $timeout, AMQManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $timeout(() => {
                angular.element('#table-queue').DataTable({
                    lengthMenu: [5, 10, 20, 50, 75, 100],
                    language: {
                        paginate: {
                            previous: `<i class="fa fa-angle-left"></i>`,
                            next: `<i class="fa fa-angle-right"></i>`
                        }
                    },
                    processing: true,
                    serverSide: true,
                    ajax: AMQManagerService.amqQueueShow($stateParams.amqId)
                });
            });
        };
    }
})();