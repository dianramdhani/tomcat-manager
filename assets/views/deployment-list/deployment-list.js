(function () {
    'use strict';

    // Usage:
    // Deployment list container.
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('deploymentList', {
            template: require('./deployment-list.html'),
            controller: _
        });

    _.$inject = ['$scope', '$stateParams', 'ManagerService', 'UtilService'];
    function _($scope, $stateParams, ManagerService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = async () => {
            await $scope.refreshDeploymentList();
            UtilService.DTZeroConfig('#deployment-list-table', {
                columnDefs: [{
                    targets: -1,
                    orderable: false
                }],
                order: [[0, 'asc']]
            });
        };

        $scope.refreshDeploymentList = async () => {
            $scope.deploymentList = await ManagerService.showMapDeployment($stateParams.agentId, 0, 12).then(_ => _.data.object);
            $scope.$apply();
        };

        $scope.stop = (index) => {
            UtilService.drlConfirm(`Are you sure you want to stop ${$scope.deploymentList[index].deployerDeployments[0].deploymentContextName}?`, async () => {
                UtilService.drlLoading(true);
                $scope.deploymentList[index].deployerDeployments[0] = await ManagerService.actionStopDeployment($stateParams.agentId, $scope.deploymentList[index].deployerDeployments[0].deploymentContextName).then(_ => _.data.object);
                $scope.$apply();
                UtilService.drlLoading(false);
            });
        };

        $scope.start = async (index) => {
            UtilService.drlConfirm(`Are you sure you want to start ${$scope.deploymentList[index].deployerDeployments[0].deploymentContextName}?`, async () => {
                UtilService.drlLoading(true);
                $scope.deploymentList[index].deployerDeployments[0] = await ManagerService.actionStartDeployment($stateParams.agentId, $scope.deploymentList[index].deployerDeployments[0].deploymentContextName).then(_ => _.data.object);
                $scope.$apply();
                UtilService.drlLoading(false);
            });
        };

        $scope.delete = async (index) => {
            UtilService.drlConfirm(`Are you sure you want undeploy ${$scope.deploymentList[index].deployerDeployments[0].deploymentContextName}?`, async () => {
                UtilService.drlLoading(true);
                let res = await ManagerService.actionUndeploy($stateParams.agentId, $scope.deploymentList[index].deployerDeployments[0].deploymentContextName);
                console.log(res);
                UtilService.drlLoading(false);
            });
        };
    }
})();