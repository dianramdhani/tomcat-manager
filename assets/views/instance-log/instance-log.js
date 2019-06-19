(function () {
    'use strict';

    // Usage:
    // Instance log table.
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('instanceLog', {
            template: require('./instance-log.html'),
            bindings: {
                log: '=',
            }
        });
})();