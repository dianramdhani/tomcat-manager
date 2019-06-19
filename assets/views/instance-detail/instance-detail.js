(function () {
    'use strict';

    // Usage:
    // Instance detail container
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('instanceDetail', {
            template: require('./instance-detail.html'),
            bindings: {
                instance: '=',
            },
        });
})();