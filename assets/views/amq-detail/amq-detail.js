(function () {
    'use strict';

    // Usage:
    // AMQ detail container.
    // Creates:
    // Call by amq-instance component.

    window.app
        .component('amqDetail', {
            template: require('./amq-detail.html'),
            bindings: {
                amq: '=',
            }
        });
})();