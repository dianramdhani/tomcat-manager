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

            $scope.$watch(() => $state.$current.name, () => {
                let state = {
                    name: $state.$current.name,
                    params: angular.copy($stateParams)
                };
                if (state.params.hasOwnProperty('#')) {
                    delete (state.params['#']);
                }

                $ctrl.menu.forEach(menu => {
                    if (menu.hasOwnProperty('menu')) {
                        menu.menu.forEach(_menu => {
                            if (angular.equals(_menu.state, state)) {
                                $scope.active(_menu, menu);
                            }
                        })
                    } else {
                        if (angular.equals(menu.state, state)) {
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
            clearActive();
            if (!element.hasOwnProperty('menu')) {
                element['active'] = true;
                $ctrl.menuActiveNow.push(element);
            }
            if (elementParent !== null) {
                elementParent['active'] = true;
                $ctrl.menuActiveNow.push(elementParent);
            }
        };

        $scope.goto = (state) => {
            if (state) {
                $state.go(state.name, state.params);
            }
        };
    }
})();