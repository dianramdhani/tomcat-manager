(function () {
    'use strict';

    // Usage:
    // Header container.

    window.app
        .component('drlHeader', {
            template: require('./drl-header.html'),
            controller: drl
        });

    drl.$inject = [];
    function drl() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();