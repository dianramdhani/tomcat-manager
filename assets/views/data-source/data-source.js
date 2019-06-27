(function () {
    'use strict';

    // Usage:
    // Data source container.

    window.app
        .component('dataSource', {
            template: require('./data-source.html'),
            controller: _,
        });

    _.$inject = ['$scope', '$q', '$timeout', 'DatasourceService', 'ManagerService'];
    function _($scope, $q, $timeout, DatasourceService, ManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = async () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let datasources = await DatasourceService.getDatasourceByDatasourceId().then(_ => _.data.object),
                    instancesTarget = await $q.all(datasources.map(datasource => DatasourceService.getDatasourceInstanceByDatasourceId(datasource.dataSourceId).then(_ => _.data.object))),
                    instances = await ManagerService.listAllInstances(0, 12).then(_ => _.data.object);
                datasources.forEach((datasource, i) => {
                    datasource['instancesTarget'] = instancesTarget[i].map(_ => _.instanceId);
                });
                console.log({ datasources, instances });
                return [datasources, instances];
            };

            [$scope.datasources, $scope.instances] = await getInitialData();
            $scope.$apply();

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
    }
})();