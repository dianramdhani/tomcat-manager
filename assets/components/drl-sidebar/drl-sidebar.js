(function () {
    'use strict';

    // Usage:
    // Sidebar container.
    // Creates:
    // Add class="slim-sidebar" inside tag.

    window.app
        .component('drlSidebar', {
            template: require('./drl-sidebar.html'),
            controller: drl,
            bindings: {
                menu: '=',
                menuActiveNow: '='
            },
        });

    drl.$inject = ['$scope', '$state', '$timeout'];
    function drl($scope, $state, $timeout) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            const checkActive = () => {
                $ctrl.menu.forEach(menu => {
                    if (menu.hasOwnProperty('active')) {
                        if (menu.active) {
                            $scope.active(menu, menu.href);
                        }
                    }
                    if (menu.hasOwnProperty('menu')) {
                        menu.menu.forEach(_menu => {
                            if (_menu.hasOwnProperty('active')) {
                                $scope.active(_menu, _menu.href, menu);
                            }
                        });
                    }
                });
            };

            $timeout(() => {
                $ctrl.menuActiveNow = [];
                checkActive();
            });
        };

        const clearActive = () => {
            $ctrl.menu.forEach(menu => {
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
            $ctrl.menuActiveNow = [];
        };

        $scope.active = (element, href, elementParent = null) => {
            if (!element.hasOwnProperty('menu')) {
                clearActive();
                element['active'] = true;
                $state.go(href);
                $ctrl.menuActiveNow.push(element);
            }
            if (elementParent !== null) {
                elementParent['active'] = true;
                $ctrl.menuActiveNow.push(elementParent);
            }
        };
    }
})();