(function () {
    'use strict';

    // Usage:
    // Work manager container.

    window.app
        .component('workManager', {
            template: require('./work-manager.html'),
            controller: _,
        });

    _.$inject = ['$scope', '$q', 'WorkManagerService', 'ManagerService'];
    function _($scope, $q, WorkManagerService, ManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = async () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let listWorkManager = await WorkManagerService.listAllWorkManager().then(_ => _.data.object),
                    listWorkManagerInstances = await $q.all(listWorkManager.map(({ workManagerId }) => WorkManagerService.getWorkmanagerInstanceByWorkmanagerId(workManagerId).then(_ => _.data.object))),
                    instances = await ManagerService.listAllInstances(0, 12);
                listWorkManagerInstances.forEach((instances, i) => {
                    listWorkManager[i]['instances'] = instances.map(_ => _.instanceId);
                });
                // issue: fungsi instance harusnya yang belum sama sekali di gunakan oleh workManager.
                // sehingga servicenya beda.
                console.log({ listWorkManager, instances });
                return [listWorkManager];
            };

            [$scope.listWorkManager] = await getInitialData();
            $scope.$apply();
        };
    }
})();