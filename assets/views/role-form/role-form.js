(function () {
    'use strict';

    // Usage:
    // Form for adding or editing role.
    // Creates:
    // Call by role-management.

    window.app
        .component('roleForm', {
            template: './role-form.html',
            controller: _
        });

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();