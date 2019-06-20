(function () {
    'use strict';

    // Usage:
    // AMQ instance container.

    window.app
        .component('amqInstance', {
            template: require('./amq-instance.html'),
            controller: _
        });

    _.$inject = [];
    function _() {
        var $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();