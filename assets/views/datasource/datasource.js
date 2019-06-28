(function () {
    'use strict';

    // Usage:
    // Data source container.

    window.app
        .component('datasource', {
            template: require('./datasource.html'),
            controller: _,
        });

    _.$inject = ['$scope', '$q', '$timeout', 'DatasourceService', 'ManagerService', 'UtilService'];
    function _($scope, $q, $timeout, DatasourceService, ManagerService, UtilService) {
        /**
         * Get initial data.
         */
        const getInitialData = async () => {
            let datasources = await DatasourceService.listAllDatasource().then(_ => _.data.object),
                instancesTarget = await $q.all(datasources.map(datasource => DatasourceService.getDatasourceInstanceByDatasourceId(datasource.dataSourceId).then(_ => _.data.object))),
                instances = await ManagerService.listAllInstances(0, 12).then(_ => _.data.object);
            datasources.forEach((datasource, i) => {
                datasource['instancesTarget'] = instancesTarget[i].map(_ => _.instanceId);
            });
            console.log({ datasources, instances });
            return [datasources, instances];
        };

        /**
         * Refresh datasource dan instances.
         */
        const refreshData = async () => {
            [$scope.datasources, $scope.instances] = await getInitialData();
            $scope.$apply();
        }

        let $ctrl = this;
        $ctrl.$onInit = async () => {
            await refreshData();
            $timeout(() => {
                // initial select2
                for (const i in $scope.datasources) {
                    angular.element(`#instances-target-${i}`).select2({ width: '100%' });
                }
            });
        };

        $scope.differ = (a, b) => {
            return !angular.equals(a, b);
        };

        $scope.instancesTargetChanges = (datasource, instancesId) => {
            let instancesTarget = instancesId.map((instanceId) => {
                let instance = $scope.instances.filter(instance => instance.instanceId === instanceId)[0];
                return instance;
            });
            console.log({ datasource, instancesTarget });
        };

        $scope.delete = (id) => {
            UtilService.drlConfirm('Are you sure want to delete this record?', async () => {
                let res = await DatasourceService.deleteDatasource(id);
                if (res.status === 200) {
                    UtilService.drlAlert('success', res.data.message);
                    refreshData();
                }
                console.log(res);
            });
        };
    }
})();