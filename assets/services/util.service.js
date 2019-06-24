(function () {
    'use strict';

    window.app
        .service('UtilService', UtilService);

    UtilService.$inject = ['$compile', '$rootScope', '$document', '$q', 'DTOptionsBuilder'];
    function UtilService($compile, $rootScope, $document, $q, DTOptionsBuilder) {
        this.drlAlert = drlAlert;
        this.drlLoading = drlLoading;
        this.showAlertWhenError = showAlertWhenError;
        this.saveAsJson = saveAsJson;
        this.DTOptionsCreator = DTOptionsCreator;

        /**
        * Alert with modal mode. Before call it, please create div id="drl-alert-container".
        * @param {String} type Required. Type of alert. The value is 'success' or 'info' or 'warning' or 'danger'.
        * @param {String} title Required. Type string. Title of alert.
        * @param {String} body Optional. Type string. Content of alert.
        * @param {Function} onClose Optional. Type function. Will be call when alert was closed.
        */
        function drlAlert(type, title, body = '', onClose = angular.noop) {
            let alertContainer = angular.element('#drl-alert-container'),
                alertComponent = `<drl-alert type="${type}" title="${title}" body="${body}" on-close="onClose()"></drl-alert>`,
                alertScope = Object.assign($rootScope.$new(), {
                    onClose: () => {
                        onClose();
                        alertScope.$destroy();
                    }
                });
            alertContainer.prepend($compile(alertComponent)(alertScope));
        }

        const loadingContainer = angular.element($document[0].body),
            loadingComponent = '<drl-loading></drl-loading>';
        let loadingScope, loadingCompile;
        /**
         * Loading for slow request.
         * @param {Boolean} show Required. True if you want to show loading.
         */
        function drlLoading(show) {
            if (show === true) {
                loadingScope = $rootScope.$new();
                loadingCompile = $compile(loadingComponent)(loadingScope);
                loadingContainer.prepend(loadingCompile);
            } else {
                loadingScope.$destroy();
                loadingCompile.remove();
            }
        }

        /**
         * Show alert danger when status is not 200. Split response by status data. Call by service.
         * @param {Object} response Required. Response from $http request.
         */
        function showAlertWhenError(request) {
            let q = $q.defer();
            request.then(res => {
                if (res.data.status === 200) {
                    q.resolve(res);
                } else {
                    drlAlert('danger', res.data.message);
                    q.reject(res);
                }
            });
            return q.promise;
        }

        /**
         * Create JSON file from data for testing.
         * @param {Object} data Required. The data will be a JSON.
         * @param {String} fileName Required. Name file. 
         */
        function saveAsJson(data, fileName) {
            let json = JSON.stringify(data),
                blob = new Blob([json], {
                    type: "application/json"
                });
            saveAs(blob, fileName);
        }

        /**
         * Create all options for attribute datatable required. 
         * @param {Object} ajax Required. Ajax options required for request datatable data.
         * @param {Object} scope Optional. Scope of components who call it if you want to pass some scope element inside column.
         */
        function DTOptionsCreator(ajax, scope = null) {
            scope = scope || $rootScope.$new();
            let dtOptions = DTOptionsBuilder
                .newOptions()
                .withOption('ajax', ajax)
                .withDataProp('data')
                .withOption('processing', true)
                .withOption('serverSide', true)
                .withOption('createdRow', (row, data, dataIndex) => {
                    $compile(angular.element(row).contents())(scope);
                })
                .withOption('lengthMenu', [5, 10, 20])
                .withPaginationType('simple_numbers')
                .withLanguage({
                    oPaginate: {
                        sNext: '<i class="fa fa-angle-right"></i>',
                        sPrevious: '<i class="fa fa-angle-left"></i>'
                    }
                });
            return dtOptions;
        }
    }
})();