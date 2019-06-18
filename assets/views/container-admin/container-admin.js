(function () {
    'use strict';

    // Usage:
    // Admin container.

    window.app
        .component('containerAdmin', {
            template: require('./container-admin.html'),
            controller: _
        });

    _.$inject = ['$scope'];
    function _($scope) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
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
                                title: 'Tomcat 1',
                                href: 'admin.tomcatInstance'
                            },
                            {
                                title: 'Tomcat 2',
                                href: 'admin.tomcatInstance'
                            },
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
        };
    }
})();