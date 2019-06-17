(function () {
    'use strict';

    // Usage:
    // Dashboard container.

    window.app
        .component('dashboard', {
            template: require('./dashboard.html'),
            controller: _
        });

    _.$inject = ['$scope', 'AMQManagerService', 'ManagerService'];
    function _($scope, AMQManagerService, ManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = async () => {
            /**
             * Check health.
             * @param {Array} arr Required. List data.
             * @param {String} idName Required. Name of id.
             * @param {Function} service Required. Service function.
             */
            const checkHealth = async (arr, idName, service) => {
                for (const i in arr) {
                    arr[i]['health'] = await service(arr[i][idName]).then(_ => _.data.object);
                }
            };

            // get all list
            $scope.listAmq = await AMQManagerService.listAmq(0, 12).then(_ => _.data.iteratorObject);
            $scope.listAgent = await ManagerService.listAgent(0, 12).then(_ => _.data.iteratorObject);
            $scope.listGroupInstance = await ManagerService.listGroupInstance(0, 10).then(_ => _.data.iteratorObject);

            // check all health
            await checkHealth($scope.listAmq, 'instanceAmqId', AMQManagerService.checkAgentHealth);
            await checkHealth($scope.listAgent, 'agentId', ManagerService.checkAgentHealth);

            console.log($scope.listAmq, $scope.listAgent, $scope.listGroupInstance);
        };
    }
})();