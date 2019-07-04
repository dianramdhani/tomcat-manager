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

    drl.$inject = ['$scope', '$timeout', '$state', '$stateParams'];
    function drl($scope, $timeout, $state, $stateParams) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            const checkActive = () => {
                $ctrl.menu.forEach(menu => {
                    if (menu.hasOwnProperty('active')) {
                        if (menu.active) {
                            $scope.active(menu);
                            $state.go(menu.href);
                        }
                    }
                    if (menu.hasOwnProperty('menu')) {
                        menu.menu.forEach(_menu => {
                            if (_menu.hasOwnProperty('active')) {
                                $scope.active(_menu, menu);
                                $state.go(_menu.href);
                            }
                        });
                    }
                });
            };

            $timeout(() => {
                $ctrl.menuActiveNow = [];
                checkActive();
            });

            $scope.$watch(() => $state.$current.name, href => {
                // set params into href
                let paramsKeys = Object.keys($stateParams);
                if (paramsKeys.length > 1) {
                    href = `${href}({${paramsKeys[1]}:${$stateParams[paramsKeys[1]]}})`;
                }

                $ctrl.menu.forEach(menu => {
                    if (menu.hasOwnProperty('menu')) {
                        menu.menu.forEach(_menu => {
                            if (_menu.href === href) {
                                $scope.active(_menu, menu);
                            }
                        });
                    } else {
                        if (menu.href === href) {
                            $scope.active(menu);
                        }
                    }
                });
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

        $scope.active = (element, elementParent = null) => {
            if (!element.hasOwnProperty('menu')) {
                clearActive();
                element['active'] = true;
                $ctrl.menuActiveNow.push(element);
            }
            if (elementParent !== null) {
                elementParent['active'] = true;
                $ctrl.menuActiveNow.push(elementParent);
            }
        };
    }
})();