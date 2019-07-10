(function () {
    'use strict';

    // Usage:
    // Work manager container.

    window.app
        .component('workManager', {
            template: require('./work-manager.html'),
            controller: _,
        });

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
            };

            getInitialData();
        };
    }
})();