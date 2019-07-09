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

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();