(function () {
    'use strict';

    // Usage:
    // Dashboard container.

    window.app
        .component('dashboard', {
            template: require('./dashboard.html'),
            controller: _
        });

    _.$inject = ['$scope', '$timeout', '$q', '$state', 'AMQManagerService', 'ManagerService', 'UtilService'];
    function _($scope, $timeout, $q, $state, AMQManagerService, ManagerService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                /**
                 * Check health.
                 * @param {Array} arr Required. List data.
                 * @param {String} idName Required. Name of id.
                 * @param {Function} service Required. Service function.
                 */
                const checkHealth = async (arr, idName, service) => {
                    for (const obj of arr) {
                        obj['health'] = await service(obj[idName]).then(_ => _.data.object);
                    }
                };

                /**
                 * Set menu listAmq and listAgent.
                 */
                const setMenu = () => {
                    listAmq.forEach(amq => {
                        amq['menu'] = [
                            {
                                title: 'Detail',
                                href: `admin.amqInstance({amqId:${amq.instanceAmqId}})`
                            }
                        ];
                    });
                    listAgent.forEach(agent => {
                        agent['menu'] = [
                            {
                                title: 'Start',
                                onClick: () => {
                                    UtilService.drlConfirm(`Are you sure want to start ${agent.agentName}?`, async () => {
                                        UtilService.drlLoading(true);
                                        let res = await ManagerService.startAgent(agent.agentId);
                                        if (res.status === 200) {
                                            UtilService.drlAlert('success', res.data.message);
                                            await refreshData();
                                        }
                                        UtilService.drlLoading(false);
                                    });
                                }
                            },
                            {
                                title: 'Stop',
                                onClick: () => {
                                    UtilService.drlConfirm(`Are you sure want to stop ${agent.agentName}?`, async () => {
                                        UtilService.drlLoading(true);
                                        let res = await ManagerService.stopAgent(agent.agentId);
                                        if (res.status === 200) {
                                            UtilService.drlAlert('success', res.data.message);
                                            await refreshData();
                                        }
                                        UtilService.drlLoading(false);
                                    });
                                }
                            },
                            {
                                title: 'Detail',
                                href: `admin.tomcatInstance({agentId:${agent.agentId}})`
                            }
                        ]
                    });
                };

                // get all list
                let [listAmq, listAgent] = await $q.all([
                    AMQManagerService.listAmq(0, 12).then(_ => _.data.iteratorObject),
                    ManagerService.listAgent(0, 12).then(_ => _.data.iteratorObject)
                ]);


                // check all health
                await checkHealth(listAmq, 'instanceAmqId', AMQManagerService.checkAgentHealth);
                await checkHealth(listAgent, 'agentId', ManagerService.checkAgentHealth);

                // setMenu
                setMenu();

                return [listAmq, listAgent];
            };

            const refreshData = async () => {
                [$scope.listAmq, $scope.listAgent] = await getInitialData();
                $scope.$apply();
            };

            $timeout(async () => {
                UtilService.drlLoading(true);
                await refreshData();
                UtilService.drlLoading(false);
            });
        };
    }
})();