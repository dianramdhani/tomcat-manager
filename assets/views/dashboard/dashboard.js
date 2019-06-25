(function () {
    'use strict';

    // Usage:
    // Dashboard container.

    window.app
        .component('dashboard', {
            template: require('./dashboard.html'),
            controller: _
        });

    _.$inject = ['$scope', '$timeout', '$q', 'AMQManagerService', 'ManagerService', 'UtilService'];
    function _($scope, $timeout, $q, AMQManagerService, ManagerService, UtilService) {
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
                                title: 'Log',
                                href: 'log'
                            },
                            {
                                title: 'Detail',
                                href: 'detail'
                            }
                        ];
                    });
                    listAgent.forEach(agent => {
                        agent['menu'] = [
                            {
                                title: 'Start',
                                onClick: () => {
                                    console.log('starting', agent);
                                }
                            },
                            {
                                title: 'Stop',
                                onClick: () => {
                                    console.log('stop', agent);
                                }
                            },
                            {
                                title: 'Log',
                                href: 'log'
                            },
                            {
                                title: 'Detail',
                                href: 'detail'
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

            $timeout(async () => {
                UtilService.drlLoading(true);
                [$scope.listAmq, $scope.listAgent] = await getInitialData();
                $scope.$apply();
                UtilService.drlLoading(false);
            });
        };
    }
})();