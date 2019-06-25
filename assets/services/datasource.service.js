(function () {
    'use strict';

    window.app
        .service('DatasourceService', DatasourceService);

    DatasourceService.$inject = ['$http', 'CONFIG', 'UtilService'];
    function DatasourceService($http, CONFIG, UtilService) {
        this.getDatasourceByDatasourceId = getDatasourceByDatasourceId;
        this.getDatasourceInstanceByDatasourceId = getDatasourceInstanceByDatasourceId;

        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        // /manager/datasource/list/{offset}/{limit}
        function listDatasource(offset, limit) {

        }

        // /manager/datasource/{datasourceId}/list
        function listAllDatasource(datasourceId) {

        }

        // /manager/datasource/listAll
        function getDatasourceByDatasourceId() {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/datasource/listAll`));
        }

        // /manager/datasource/add
        function addDatasource() {

        }

        // /manager/datasource/getDatasourceInstanceByDatasourceId/{datasourceId}
        function getDatasourceInstanceByDatasourceId(datasourceId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/datasource/getDatasourceInstanceByDatasourceId/${datasourceId}`));
        }

        // /manager/datasource/update/
        function updateDatasource() {

        }

        // /manager/datasource/{datasourceId}/delete
        function deleteDatasource(datasourceId) {

        }
    }
})();