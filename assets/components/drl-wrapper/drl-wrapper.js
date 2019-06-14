(function () {
    'use strict';

    // Usage:
    // Wraps all containers, which consist of a header, sidebar, alert container, and footer.
    // Creates:
    // Transclude the view section. And binding all menu.

    window.app
        .component('drlWrapper', {
            template: require('./drl-wrapper.html'),
            controller: drl,
            transclude: true,
            bindings: {
                menu: '=',
            }
        });

    drl.$inject = [];
    function drl() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();