(function () {
    'use strict';

    window.app
        .service('UserService', UserService);

    UserService.$inject = [];
    function UserService() {
        this.exposedFn = exposedFn;

        function exposedFn() { }
    }
})();