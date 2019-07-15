(function () {
    'use strict';

    // Usage:
    // Admin container.

    window.app
        .component('containerAdmin', {
            template: require('./container-admin.html'),
            controller: _
        });

    _.$inject = ['$scope', '$timeout', '$q', '$state', 'ManagerService', 'AMQManagerService'];
    function _($scope, $timeout, $q, $state, ManagerService, AMQManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let [listAgent, listAmq] = await $q.all([
                    ManagerService.listAgent(0, 12).then(_ => _.data.iteratorObject),
                    AMQManagerService.listAmq(0, 12).then(_ => _.data.iteratorObject)
                ]);
                return [listAgent, listAmq];
            };

            $scope.menu = {
                sidebar: [
                    {
                        title: 'Dashboard',
                        icon: 'icon ion-ios-keypad',
                        state: {
                            name: 'admin.dashboard',
                            params: {}
                        },
                        active: true
                    },
                    {
                        title: 'Tomcat Instance',
                        icon: 'icon ion-ios-cube',
                        menu: [
                            {
                                title: 'Add Instance',
                                state: {
                                    name: 'admin.tomcatForm',
                                    params: { agentId: null }
                                }
                            }
                        ]
                    },
                    {
                        title: 'AMQ Instance',
                        icon: 'icon ion-ios-cube',
                        menu: [
                            {
                                title: 'Add Instance',
                                state: {
                                    name: 'admin.amqForm',
                                    params: { amqId: null }
                                }
                            }
                        ]
                    },
                    {
                        title: 'DataSource',
                        icon: 'icon ion-ios-albums',
                        state: {
                            name: 'admin.datasource',
                            params: {}
                        }
                    },
                    {
                        title: 'Work Manager',
                        icon: 'icon ion-ios-list-box',
                        state: {
                            name: 'admin.workManager',
                            params: {}
                        }
                    },
                    {
                        title: 'User Management',
                        icon: 'icon ion-ios-contacts',
                        state: {
                            name: 'admin.userManagement',
                            params: {}
                        }
                    },
                ],
                dropdownC: [
                    {
                        title: 'Account Settings',
                        icon: 'icon ion-ios-settings',
                        state: {
                            name: 'admin.userSetting',
                            params: {}
                        }
                    }
                ]
            };

            $timeout(async () => {
                let [listAgent, listAmq] = await getInitialData();

                // add menu Tomcat Instance
                listAgent.forEach(agent => {
                    $scope.menu.sidebar.find(({ title }) => title === 'Tomcat Instance').menu.push({
                        title: agent.agentName,
                        state: {
                            name: 'admin.tomcatInstance',
                            params: { agentId: agent.agentId.toString() }
                        }
                    });
                });
                listAmq.forEach(amq => {
                    $scope.menu.sidebar.find(({ title }) => title === 'AMQ Instance').menu.push({
                        title: amq.instanceAmqName,
                        state: {
                            name: 'admin.amqInstance',
                            params: { amqId: amq.instanceAmqId.toString() }
                        }
                    });
                });

                $scope.$apply();

                $state.go('admin.dashboard');
            });
        };
    }
})();