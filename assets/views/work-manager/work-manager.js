(function () {
    'use strict';

    // Usage:
    // Work manager container.

    window.app
        .component('workManager', {
            template: require('./work-manager.html'),
            controller: _,
        });

    _.$inject = ['$scope', '$q', '$timeout', '$element', 'WorkManagerService', 'ManagerService'];
    function _($scope, $q, $timeout, $element, WorkManagerService, ManagerService) {
        /**
        * Get initial data.
        */
        const getInitialData = async () => {
            let listWorkManager = await WorkManagerService.listAllWorkManager().then(_ => _.data.object),
                listWorkManagerInstances = await $q.all(listWorkManager.map(({ workManagerId }) => WorkManagerService.getWorkmanagerInstanceByWorkmanagerId(workManagerId).then(_ => _.data.object))),
                instances = await ManagerService.listAllInstances(0, 12).then(_ => _.data.object);
            listWorkManagerInstances.forEach((instancesTarget, i) => {
                listWorkManager[i]['instancesTarget'] = instancesTarget.map(_ => _.instanceId);
            });
            console.log({ listWorkManager, instances });
            return [listWorkManager, instances];
        };

        /**
         * Refresh datasource dan instances.
         */
        const refreshData = async () => {
            [$scope.listWorkManager, $scope.instances] = await getInitialData();
            $scope.$apply();
        }

        let $ctrl = this;
        $ctrl.$onInit = async () => {
            await refreshData();
            $timeout(() => {
                // initial select2
                for (const i in $scope.listWorkManager) {
                    $element.find(`#instances-target-${i}`).select2({ width: '100%' });
                }
            });
        };

        $scope.differ = (a, b) => {
            return !angular.equals(a, b);
        };

        $scope.instancesTargetChange = (workManager, instancesTarget) => {
            console.log('change instance target work manager', workManager, instancesTarget);
        };
    }
})();