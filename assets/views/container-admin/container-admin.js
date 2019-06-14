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
            $scope.menu = [
                {
                    title: 'Tes 1',
                    icon: 'icon ion-ios-search',
                    href: '',
                    menu: [
                        {
                            title: 'child 1',
                            href: 'child1'
                        },
                        {
                            title: 'child 2',
                            href: 'child2'
                        },
                        {
                            title: 'child 3',
                            href: 'child3'
                        }
                    ]
                },
                {
                    title: 'Tes 2',
                    icon: 'icon ion-ios-search',
                    href: 'tes2'
                },
                {
                    title: 'Tes 3',
                    icon: 'icon ion-ios-search',
                    href: '',
                    menu: [
                        {
                            title: 'child 1',
                            href: 'child31'
                        },
                        {
                            title: 'child 2',
                            href: 'child32',
                            active: true
                        },
                        {
                            title: 'child 3',
                            href: 'child33'
                        }
                    ]
                },
            ];
        };
    }
})();