(function () {
    'use strict';

    // Usage:
    // Data source container.

    window.app
        .component('dataSource', {
            template: require('./data-source.html'),
            controller: _,
        });

    _.$inject = [];
    function _() {
        let $ctrl = this;
        $ctrl.$onInit = () => { };
    }
})();