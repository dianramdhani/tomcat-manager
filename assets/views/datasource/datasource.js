(function () {
    'use strict';

    // Usage:
    // Data source container.

    window.app
        .component('datasource', {
            template: require('./datasource.html'),
            controller: _,
        });

    _.$inject = ['$scope', '$q', '$timeout', '$element', 'DatasourceService', 'ManagerService', 'UtilService'];
    function _($scope, $q, $timeout, $element, DatasourceService, ManagerService, UtilService) {
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
                    $element.find(`#instances-target-${i}`).select2({ width: '100%' });
                }
            });
        };

        $scope.differ = (a, b) => {
            return !angular.equals(a, b);
        };

        $scope.instancesTargetChange = (datasource, instancesId) => {
            // let instancesTarget = instancesId.map((instanceId) => {
            //     let instance = $scope.instances.filter(instance => instance.instanceId === instanceId)[0];
            //     return instance;
            // });
            console.log('instancesTargetChange', datasource, instancesId);
        };

        $scope.delete = (id) => {
            UtilService.drlConfirm('Are you sure want to delete this record?', async () => {
                let message = await DatasourceService.deleteDatasource(id).then(_ => _.data.message);
                UtilService.drlAlert('success', message);
                refreshData();
            });
        };
    }
})();