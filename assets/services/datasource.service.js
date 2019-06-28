(function () {
    'use strict';

    window.app
        .service('DatasourceService', DatasourceService);

    DatasourceService.$inject = ['$http', 'CONFIG', 'UtilService'];
    function DatasourceService($http, CONFIG, UtilService) {
        this.getDatasourceByDatasourceId = getDatasourceByDatasourceId;
        this.listAllDatasource = listAllDatasource;
        this.getDatasourceInstanceByDatasourceId = getDatasourceInstanceByDatasourceId;
        this.updateDatasource = updateDatasource;
        this.addDatasource = addDatasource;

        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        // /manager/datasource/list/{offset}/{limit}
        function listDatasource(offset, limit) {

        }

        // /manager/datasource/listAll
        function listAllDatasource() {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/datasource/listAll`));
        }

        // /manager/datasource/{datasourceId}/list
        function getDatasourceByDatasourceId(datasourceId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/datasource/${datasourceId}/list`));
        }

        // /manager/datasource/add
        function addDatasource(datasourceInstance) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/datasource/add`, datasourceInstance))
        }

        // /manager/datasource/getDatasourceInstanceByDatasourceId/{datasourceId}
        function getDatasourceInstanceByDatasourceId(datasourceId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/datasource/getDatasourceInstanceByDatasourceId/${datasourceId}`));
        }

        // /manager/datasource/update/
        function updateDatasource(datasourceInstance) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/datasource/update/${datasourceInstance.dataSourceId}`, datasourceInstance));
        }

        // /manager/datasource/{datasourceId}/delete
        function deleteDatasource(datasourceId) {

        }
    }
})();