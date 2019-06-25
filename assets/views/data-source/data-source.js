(function () {
    'use strict';

    // Usage:
    // Data source container.

    window.app
        .component('dataSource', {
            template: require('./data-source.html'),
            controller: _,
        });

    _.$inject = ['$scope', '$q', 'DatasourceService', 'ManagerService'];
    function _($scope, $q, DatasourceService, ManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = async () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let datasources = await DatasourceService.getDatasourceByDatasourceId().then(_ => _.data.object),
                    instancesTarget = await $q.all(datasources.map(datasource => DatasourceService.getDatasourceInstanceByDatasourceId(datasource.dataSourceId).then(_ => _.data.object)));
                datasources.forEach((datasource, i) => {
                    datasource['instancesTarget'] = instancesTarget[i];
                });
                console.log(datasources);
                return [datasources];
            };

            [$scope.datasource] = await getInitialData();
            $scope.$apply();
        };
    }
})();