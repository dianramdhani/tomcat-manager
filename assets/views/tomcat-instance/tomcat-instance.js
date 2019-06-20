(function () {
    'use strict';

    // Usage:
    // Tomcat instance information.

    window.app
        .component('tomcatInstance', {
            template: require('./tomcat-instance.html'),
            controller: _
        });

    _.$inject = ['$stateParams', '$scope', '$timeout', '$q', 'ManagerService', 'UtilService'];
    function _($stateParams, $scope, $timeout, $q, ManagerService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let instance = await ManagerService.showInstanceByAgentId($stateParams.agentId).then(_ => _.data.object),
                    instanceCpuLineChart, instancePhysicalMemoryChart, instanceHeapMemoryChart, instanceLog, tailLog;

                instance['health'] = await ManagerService.checkAgentHealth($stateParams.agentId).then(_ => _.data.object);
                if (instance.health.agentStatus === 'true') {
                    [instanceCpuLineChart, instancePhysicalMemoryChart, instanceHeapMemoryChart, instanceLog, tailLog] = await $q.all([
                        ManagerService.instanceCpuLineChart($stateParams.agentId).then(_ => _.data.object),
                        ManagerService.instancePhysicalMemoryChart($stateParams.agentId).then(_ => _.data.object),
                        ManagerService.instanceHeapMemoryChart($stateParams.agentId).then(_ => _.data.object),
                        ManagerService.datatableInstanceLog(30).then(_ => _.data),
                        ManagerService.tailLogAgent($stateParams.agentId, 1).then(_ => _.data.object)
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
                }

                return {
                    instance,
                    instanceCpuLineChart,
                    instancePhysicalMemoryChart,
                    instanceHeapMemoryChart,
                    instanceLog,
                    tailLog
                };
            };

            UtilService.drlLoading(true);
            getInitialData().then(({ instance, instanceCpuLineChart, instancePhysicalMemoryChart, instanceHeapMemoryChart, instanceLog, tailLog }) => {
                $timeout(() => {
                    $scope.instance = instance;
                    $scope.chart = { instanceCpuLineChart, instancePhysicalMemoryChart, instanceHeapMemoryChart };
                    $scope.instanceLog = instanceLog;
                    $scope.tailLog = tailLog;
                    UtilService.drlLoading(false);
                });
                console.log({ instance, instanceCpuLineChart, instancePhysicalMemoryChart, instanceHeapMemoryChart, instanceLog });
            });
        };
    }
})();