(function () {
    'use strict';

    // Usage:
    // Work manager for add and update form.
    // Creates:
    // Call by work-manager component.

    window.app
        .component('workManagerForm', {
            template: require('./work-manager-form.html'),
            controller: _,
        });

    _.$inject = ['$scope', '$stateParams', '$timeout', 'WorkManagerService'];
    function _($scope, $stateParams, $timeout, WorkManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
            * Get initial data.
            */
            const getInitialData = async () => {
                let workManager = {
                    maxThreads: 200,
                    minThreads: 25,
                    maxIdleTime: 60000
                }, canUpdate = $stateParams.workManagerId !== null;
                if (canUpdate) {
                    workManager = await WorkManagerService.getWorkManagerByWorkManagerId($stateParams.workManagerId).then(_ => _.data.object);
                }
                console.log({ workManager, canUpdate });
                return [workManager, canUpdate];
            };

            $timeout(async () => {
                [$scope.workManager, $scope.canUpdate] = await getInitialData();
                $scope.$apply();
            });
        };
    }
})();