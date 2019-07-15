(function () {
    'use strict';

    // Usage:
    // Header container.

    window.app
        .component('drlHeader', {
            template: require('./drl-header.html'),
            controller: drl,
            bindings: {
                menu: '=',
                menuActiveNow: '='
            }
        });

    drl.$inject = ['$scope', '$state', '$timeout', '$rootScope', 'AuthService'];
    function drl($scope, $state, $timeout, $rootScope, AuthService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            const checkActive = () => {
                $ctrl.menu.dropdownC.forEach(menu => {
                    if (menu.hasOwnProperty('active')) {
                        if (menu.active) {
                            $scope.active(menu, menu.state);
                        }
                    }
                });
            };

            $scope.username = $rootScope.globals.currentUser.object[1];

            $timeout(() => {
                checkActive();
            });
        };

        const clearActive = () => {
            $ctrl.menu.sidebar.forEach(menu => {
                if (menu.hasOwnProperty('active')) {
                    menu.active = false;
                }
                if (menu.hasOwnProperty('menu')) {
                    menu.menu.forEach(_menu => {
                        if (_menu.hasOwnProperty('active')) {
                            _menu.active = false;
                        }
                    });
                }
            });
            $ctrl.menu.dropdownC.forEach(menu => {
                if (menu.hasOwnProperty('active')) {
                    menu.active = false;
                }
            })
            $ctrl.menuActiveNow = [];
        };

        $scope.logout = () => {
            AuthService.logout();
        };

        $scope.active = (element, state) => {
            clearActive();
            $state.go(state.name, state.params);
            $ctrl.menuActiveNow.push(element);
        };
    }
})();