(function () {
    'use strict';

    // Usage:
    // User setting container.

    window.app
        .component('userSetting', {
            template: require('./user-setting.html'),
            controller: _
        });

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();