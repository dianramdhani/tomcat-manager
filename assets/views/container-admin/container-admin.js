(function () {
    'use strict';

    // Usage:
    // Admin container.

    window.app
        .component('containerAdmin', {
            template: require('./container-admin.html'),
            controller: _
        });

    _.$inject = ['$scope', 'ManagerService'];
    function _($scope, ManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let listAgent = await ManagerService.listAgent(0, 12).then(_ => _.data.iteratorObject);
                return { listAgent };
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

            getInitialData().then(({ listAgent }) => {
                // add menu Tomcat Instance
                listAgent.forEach(agent => {
                    $scope.menu.sidebar.find(({ title }) => title === 'Tomcat Instance').menu.push({
                        title: agent.agentName,
                        href: `admin.tomcatInstance({agentId:${agent.agentId}})`
                    });
                });
            });
        };
    }
})();