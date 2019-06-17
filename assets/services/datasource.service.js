(function () {
    'use strict';

    window.app
        .service('DatasourceService', DatasourceService);

    DatasourceService.$inject = [];
    function DatasourceService() {
        // /manager/datasource/list/{offset}/{limit}
        function listDatasource(offset, limit) {

        }

        // /manager/datasource/{datasourceId}/list
        function listAllDatasource(datasourceId) {

        }

        // /manager/datasource/listAll
        function getDatasourceByDatasourceId() {

        }

        // /manager/datasource/add
        function addDatasource() {

        }

        // /manager/datasource/update/
        function updateDatasource() {

        }

        // /manager/datasource/{datasourceId}/delete
        function deleteDatasource(datasourceId) {

        }
    }
})();