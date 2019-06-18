(function () {
    'use strict';

    // Usage:
    // Dashboard container.

    window.app
        .component('dashboard', {
            template: require('./dashboard.html'),
            controller: _
        });

    _.$inject = ['$scope', '$timeout', 'AMQManagerService', 'ManagerService', 'UtilService'];
    function _($scope, $timeout, AMQManagerService, ManagerService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            const getInitialData = async () => {
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
                let listAmq = await AMQManagerService.listAmq(0, 12).then(_ => _.data.iteratorObject),
                    listAgent = await ManagerService.listAgent(0, 12).then(_ => _.data.iteratorObject),
                    listGroupInstance = await ManagerService.listGroupInstance(0, 10).then(_ => _.data.iteratorObject);

                // check all health
                await checkHealth(listAmq, 'instanceAmqId', AMQManagerService.checkAgentHealth);
                await checkHealth(listAgent, 'agentId', ManagerService.checkAgentHealth);

                return {
                    listAmq,
                    listAgent,
                    listGroupInstance
                };
            };

            UtilService.drlLoading(true);
            getInitialData().then(({ listAmq, listAgent }) => {
                $timeout(() => {
                    $scope.listAmq = listAmq;
                    $scope.listAgent = listAgent;
                    UtilService.drlLoading(false);
                });
                console.log({ listAmq, listAgent });
            });
        };
    }
})();