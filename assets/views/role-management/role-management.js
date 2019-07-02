(function () {
    'use strict';

    // Usage:
    // Table container for list of role.
    // Creates:
    // Call by user-management component.

    window.app
        .component('roleManagement', {
            template: require('./role-management.html'),
            controller: _
        });

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();