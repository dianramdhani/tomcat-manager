(function () {
    'use strict';

    // Usage:
    // Form register for new user.
    // Creates:
    // Call by user-management component.

    window.app
        .component('registerUser', {
            template: require('./register-user.html'),
            controller: _,
        });

    _.$inject = [];
    function _() {
        var $ctrl = this;
        $ctrl.$onInit = function () { };
    }
})();