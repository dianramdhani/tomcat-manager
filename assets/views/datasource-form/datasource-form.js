(function () {
    'use strict';

    // Usage:
    // DataSource form container.
    // Creates:
    // Call by datasource component.

    window.app
        .component('datasourceForm', {
            template: require('./datasource-form.html'),
            controller: _,
            bindings: {
                Binding: '=',
            },
        });

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();