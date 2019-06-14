(function () {
    'use strict';

    // Usage:
    // Footer container.

    window.app
        .component('drlFooter', {
            template: require('./drl-footer.html'),
            controller: drl,
            bindings: {
                Binding: '=',
            },
        });

    drl.$inject = [];
    function drl() {
        let $ctrl = this;
        $ctrl.$onInit = function () { };
    }
})();