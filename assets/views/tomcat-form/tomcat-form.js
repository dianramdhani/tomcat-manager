(function () {
    'use strict';

    // Usage:
    // Form for adding tomcat instance.

    window.app
        .component('tomcatForm', {
            template: require('./tomcat-form.html'),
            controller: _
        });

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();