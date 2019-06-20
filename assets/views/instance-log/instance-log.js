(function () {
    'use strict';

    // Usage:
    // Instance log table.
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('instanceLog', {
            template: require('./instance-log.html'),
            controller: _,
            bindings: {
                log: '=',
            }
        });

    _.$inject = ['$timeout'];
    function _($timeout) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            $timeout(() => {
                $('#log').DataTable({
                    lengthMenu: [5, 10, 25, 50, 75, 100],
                    language: {
                        paginate: {
                            previous: `<i class="fa fa-angle-left"></i>`,
                            next: `<i class="fa fa-angle-right"></i>`
                        }
                    }
                });
            });
        };
    }
})();