(function () {
    'use strict';

    // Usage:
    // Admin container.

    window.app
        .component('containerAdmin', {
            template: require('./container-admin.html'),
            controller: _
        });

    _.$inject = ['$scope', 'ManagerService', 'AMQManagerService'];
    function _($scope, ManagerService, AMQManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = async () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let listAgent = await ManagerService.listAgent(0, 12).then(_ => _.data.iteratorObject),
                    listAmq = await AMQManagerService.listAmq(0, 12).then(_ => _.data.iteratorObject);
                return [listAgent, listAmq];
            }

            $scope.menu = {
                sidebar: [
                    {
                        title: 'Dashboard',
                        icon: 'icon ion-ios-keypad',
                        href: 'admin.dashboard',
                        active: true
                    },
                    {
                        title: 'Tomcat Instance',
                        icon: 'icon ion-cube',
                        menu: [
                            {
                                title: 'Add Instance',
                                href: 'admin.addTomcat'
                            }
                        ]
                    },
                    {
                        title: 'AMQ Instance',
                        icon: 'icon ion-cube',
                        menu: [
                            {
                                title: 'Add Instance',
                                href: ''
                            }
                        ]
                    }
                ],
                dropdownC: [
                    {
                        title: 'Account Settings',
                        icon: 'icon ion-ios-gear',
                        href: 'admin.userSetting'
                    }
                ]
            };
            let [listAgent, listAmq] = await getInitialData();

            // add menu Tomcat Instance
            listAgent.forEach(agent => {
                $scope.menu.sidebar.find(({ title }) => title === 'Tomcat Instance').menu.push({
                    title: agent.agentName,
                    href: `admin.tomcatInstance({agentId:${agent.agentId}})`
                });
            });
            listAmq.forEach(amq => {
                $scope.menu.sidebar.find(({ title }) => title === 'AMQ Instance').menu.push({
                    title: amq.instanceAmqName,
                    href: `admin.amqInstance({amqId:${amq.instanceAmqId}})`
                });
            });

            $scope.$apply();
        };
    }
})();