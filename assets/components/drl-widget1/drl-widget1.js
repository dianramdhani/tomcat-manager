(function () {
    'use strict';

    // Usage:
    // 
    // Creates:
    // 

    window.app
        .component('drlWidget1', {
            template: require('./drl-widget1.html'),
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