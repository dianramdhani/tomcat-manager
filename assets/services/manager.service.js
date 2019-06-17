(function () {
    'use strict';

    window.app
        .service('ManagerService', ManagerService);

    ManagerService.$inject = [];
    function ManagerService() {
        this.exposedFn = exposedFn;

        function exposedFn() { }
    }
})();