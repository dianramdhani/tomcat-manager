(function () {
    'use strict';

    // Usage:
    // Form for adding tomcat instance.

    window.app
        .component('addTomcat', {
            template: require('./add-tomcat.html'),
            controller: _
        });

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();