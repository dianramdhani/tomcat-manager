(function () {
    'use strict';

    // Usage:
    // Loading container.

    window.app
        .component('login', {
            template: require('./login.html'),
            controller: _
        });

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();