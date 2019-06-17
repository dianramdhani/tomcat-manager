(function () {
    'use strict';

    window.app
        .service('AMQManagerService', AMQManagerService);

    AMQManagerService.$inject = [];
    function AMQManagerService() {
        this.exposedFn = exposedFn;

        function exposedFn() { }
    }
})();