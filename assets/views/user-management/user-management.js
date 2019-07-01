(function () {
    'use strict';

    // Usage:
    // User management container.

    window.app
        .component('userManagement', {
            template: require('./user-management.html'),
            controller: _,
        });

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = function () { };
    }
})();