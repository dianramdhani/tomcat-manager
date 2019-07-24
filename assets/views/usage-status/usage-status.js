(function () {
    'use strict';

    // Usage:
    // Usage status container.
    // Creates:
    // Call by tomcat-instance component.

    window.app
        .component('usageStatus', {
            template: require('./usage-status.html'),
            controller: _
        });

    _.$inject = ['$timeout', '$stateParams', '$scope', '$q', '$element', 'ManagerService'];
    function _($timeout, $stateParams, $scope, $q, $element, ManagerService) {
        let $ctrl = this;
        $ctrl.$onInit = async () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let [instanceCpuLineChart, instancePhysicalMemoryChart, instanceHeapMemoryChart] = await $q.all([
                    ManagerService.instanceCpuLineChart($stateParams.agentId).then(_ => _.data.object),
                    ManagerService.instancePhysicalMemoryChart($stateParams.agentId).then(_ => _.data.object),
                    ManagerService.instanceHeapMemoryChart($stateParams.agentId).then(_ => _.data.object),
                ]);

                // set plotting chart function for instanceCpuLineChart, instancePhysicalMemoryChart, andinstanceHeapMemoryChart  
                instanceCpuLineChart = Object.assign(instanceCpuLineChart, {
                    plotChart: (id) => {
                        let x = ['x', ...instanceCpuLineChart.lineSeries.map(_ => new Date(_[0]).toISOString())],
                            cpu = ['CPU Usage', ...instanceCpuLineChart.lineSeries.map(_ => _[1])];

                        c3.generate({
                            bindto: $element[0].querySelector(`#${id}`),
                            data: {
                                x: 'x',
                                xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
                                columns: [x, cpu]
                            },
                            axis: {
                                x: {
                                    type: 'timeseries',
                                    tick: {
                                        format: '%Y-%m-%d %H:%M:%S',
                                        rotate: 25,
                                        multiline: false
                                    }
                                },
                                y: {
                                    tick: {
                                        format: d => `${d} %`
                                    }
                                }
                            }
                        });
                    }
                });
                instancePhysicalMemoryChart = Object.assign(instancePhysicalMemoryChart, {
                    plotChart: (id) => {
                        let x = ['x', ...instancePhysicalMemoryChart.map(_ => new Date(_[0][0]).toISOString())],
                            stacked = ['Stacked', ...instancePhysicalMemoryChart.map(_ => _[0][1])],
                            stream = ['Stream', ...instancePhysicalMemoryChart.map(_ => _[1][1])];

                        c3.generate({
                            bindto: $element[0].querySelector(`#${id}`),
                            data: {
                                x: 'x',
                                xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
                                columns: [x, stacked, stream]
                            },
                            axis: {
                                x: {
                                    type: 'timeseries',
                                    tick: {
                                        format: '%Y-%m-%d %H:%M:%S',
                                        rotate: 25,
                                        multiline: false
                                    }
                                },
                                y: {
                                    tick: {
                                        format: d => `${d / 1024} MB`
                                    }
                                }
                            }
                        });
                    }
                });
                instanceHeapMemoryChart = Object.assign(instanceHeapMemoryChart, {
                    plotChart: (id) => {
                        let x = ['x', ...instanceHeapMemoryChart.map(_ => new Date(_[0]).toISOString())],
                            heap = ['Memory Heap Usage', ...instanceHeapMemoryChart.map(_ => _[1])];

                        c3.generate({
                            bindto: $element[0].querySelector(`#${id}`),
                            data: {
                                x: 'x',
                                xFormat: '%Y-%m-%dT%H:%M:%S.%LZ',
                                columns: [x, heap]
                            },
                            axis: {
                                x: {
                                    type: 'timeseries',
                                    tick: {
                                        format: '%Y-%m-%d %H:%M:%S',
                                        rotate: 25,
                                        multiline: false
                                    }
                                },
                                y: {
                                    tick: {
                                        format: d => `${d / 1024} MB`
                                    }
                                }
                            }
                        });
                    }
                });

                return [instanceCpuLineChart, instancePhysicalMemoryChart, instanceHeapMemoryChart];
            };

            [$scope.instanceCpuLineChart, $scope.instancePhysicalMemoryChart, $scope.instanceHeapMemoryChart] = await getInitialData();
            $scope.$apply();

            $timeout(() => {
                angular.element('#firstChart').click();
            });
        };
    }
})();