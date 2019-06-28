(function () {
    'use strict';

    // Usage:
    // DataSource form container.
    // Creates:
    // Call by datasource component.

    window.app
        .component('datasourceForm', {
            template: require('./datasource-form.html'),
            controller: _
        });

    _.$inject = ['$stateParams', '$scope', '$state', 'DatasourceService', 'UtilService'];
    function _($stateParams, $scope, $state, DatasourceService, UtilService) {
        let $ctrl = this;
        $ctrl.$onInit = async () => {
            /**
             * Get initial data.
             */
            const getInitialData = async () => {
                let datasourceInstance = { type: 'javax.sql.DataSource' },  // default value
                    canUpdate = $stateParams.datasourceId !== null;
                if (canUpdate) {
                    datasourceInstance = await DatasourceService.getDatasourceByDatasourceId($stateParams.datasourceId).then(_ => _.data.object);
                }
                return [datasourceInstance, canUpdate];
            };

            [$scope.datasourceInstance, $scope.canUpdate] = await getInitialData();
            $scope.$apply();
        };

        $scope.save = async () => {
            const afterRequest = (res) => {
                if (res.status === 200) {
                    UtilService.drlAlert('success', res.data.message);
                    $state.go('admin.datasource');
                }
            }

            if ($scope.canUpdate) {
                afterRequest(await DatasourceService.updateDatasource($scope.datasourceInstance));
            } else {
                afterRequest(await DatasourceService.addDatasource($scope.datasourceInstance));
            }
        };
    }
})();