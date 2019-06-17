(function () {
    'use strict';

    // Usage:
    // Widget container.

    window.app
        .component('drlWidget2', {
            template: require('./drl-widget2.html'),
            controller: drl,
            bindings: {
                Binding: '=',
            },
        });

    drl.$inject = [];
    function drl() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();