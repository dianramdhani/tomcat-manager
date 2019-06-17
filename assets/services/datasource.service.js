(function () {
    'use strict';

    window.app
        .service('DatasourceService', DatasourceService);

    DatasourceService.$inject = [];
    function DatasourceService() {
        this.exposedFn = exposedFn;

        function exposedFn() { }
    }
})();