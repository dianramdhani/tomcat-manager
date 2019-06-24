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

    _.$inject = ['$timeout', '$stateParams', '$scope', '$q', 'ManagerService'];
    function _($timeout, $stateParams, $scope, $q, ManagerService) {
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
                        let properties = {
                            title: {
                                text: 'Instance CPU Usage'
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                title: {
                                    text: 'Percentage'
                                },
                                labels: {
                                    format: '{value} %'
                                }
                            },
                            tooltip: {
                                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} %</b><br/>'
                            },
                            series: [
                                {
                                    name: 'CPU Usage',
                                    data: instanceCpuLineChart.lineSeries
                                }
                            ]
                        };
                        Highcharts.chart(id, properties);
                    }
                });
                instancePhysicalMemoryChart = Object.assign(instancePhysicalMemoryChart, {
                    plotChart: (id) => {
                        let properties = {
                            title: {
                                text: 'Instance Physical Memory Usage'
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                title: {
                                    text: 'Value in Mega Bytes'
                                },
                                labels: {
                                    formatter: function () {
                                        return `${this.value / 1024} MB`;
                                    }
                                }
                            },
                            tooltip: {
                                pointFormatter: function () {
                                    return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${this.y / 1024} MB</b><br/>`;
                                }
                            },
                            series: [
                                {
                                    name: 'Stacked',
                                    data: instancePhysicalMemoryChart.map(_ => _[0])
                                },
                                {
                                    name: 'Stream',
                                    data: instancePhysicalMemoryChart.map(_ => _[1])
                                }
                            ]
                        };
                        Highcharts.chart(id, properties);
                    }
                });
                instanceHeapMemoryChart = Object.assign(instanceHeapMemoryChart, {
                    plotChart: (id) => {
                        let properties = {
                            title: {
                                text: 'Instance Heap Usage'
                            },
                            xAxis: {
                                type: 'datetime'
                            },
                            yAxis: {
                                title: {
                                    text: 'Value in Mega Bytes'
                                },
                                labels: {
                                    formatter: function () {
                                        return `${this.value / 1024} MB`;
                                    }
                                }
                            },
                            tooltip: {
                                pointFormatter: function () {
                                    return `<span style="color:${this.color}">\u25CF</span> ${this.series.name}: <b>${this.y / 1024} MB</b><br/>`;
                                }
                            },
                            series: [
                                {
                                    name: 'Memory Heap Usage',
                                    data: instanceHeapMemoryChart
                                }
                            ]
                        };
                        Highcharts.chart(id, properties);
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