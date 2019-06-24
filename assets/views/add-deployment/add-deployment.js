(function () {
    'use strict';

    // Usage:
    // Modal for adding deployment.
    // Creates:
    // Call by deployment-list component.

    window.app
        .component('addDeployment', {
            template: require('./add-deployment.html'),
            controller: _
        });

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();