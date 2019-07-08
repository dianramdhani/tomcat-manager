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
        this.deleteDatasource = deleteDatasource;

        const url = `${CONFIG.managerAddress}:${CONFIG.managerPort}`;

        // /manager/datasource/list/{offset}/{limit}
        function listDatasource(offset, limit) {

        }

        function listAllDatasource() {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/datasource/listAll`));
        }

        function getDatasourceByDatasourceId(datasourceId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/datasource/${datasourceId}/list`));
        }

        function addDatasource(datasourceInstance) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/datasource/add`, datasourceInstance))
        }

        function getDatasourceInstanceByDatasourceId(datasourceId) {
            return UtilService.showAlertWhenError($http.get(`${url}/manager/datasource/getDatasourceInstanceByDatasourceId/${datasourceId}`));
        }

        function updateDatasource(datasourceInstance) {
            return UtilService.showAlertWhenError($http.post(`${url}/manager/datasource/update/${datasourceInstance.dataSourceId}`, datasourceInstance));
        }

        function deleteDatasource(datasourceId) {
            return UtilService.showAlertWhenError($http.delete(`${url}/manager/datasource/${datasourceId}/delete`));
        }
    }
})();