(function () {
    'use strict';

    window.app
        .service('UtilService', UtilService);

    UtilService.$inject = ['$compile', '$rootScope', '$document', '$q', '$timeout', 'DTOptionsBuilder'];
    function UtilService($compile, $rootScope, $document, $q, $timeout, DTOptionsBuilder) {
        this.drlAlert = drlAlert;
        this.drlLoading = drlLoading;
        this.drlConfirm = drlConfirm;
        this.showAlertWhenError = showAlertWhenError;
        this.saveAsJson = saveAsJson;
        this.DTOptionsCreator = DTOptionsCreator;
        this.DTZeroConfig = DTZeroConfig;
        this.objectToFormData = objectToFormData;

        /**
        * Alert with modal mode. Before call it, please create div id="drl-alert-container".
        * @param {String} type Required. Type of alert. The value is 'success' or 'info' or 'warning' or 'danger'.
        * @param {String} title Required. Type string. Title of alert.
        * @param {String} body Optional. Type string. Content of alert.
        * @param {Function} onClose Optional. Type function. Will be call when alert was closed.
        * @param {String} idContainer Optional. Add div with id=idContainer to add custom position alert.
        */
        function drlAlert(type, title, body = '', onClose = angular.noop, idContainer = null) {
            let alertContainer = angular.element(idContainer || '#drl-alert-container'),
                alertComponent = `<drl-alert type="${type}" title="${title}" body="${body}" on-close="onClose()"></drl-alert>`,
                alertScope = Object.assign($rootScope.$new(), {
                    onClose: () => {
                        onClose();
                        alertScope.$destroy();
                    }
                });
            alertContainer.prepend($compile(alertComponent)(alertScope));
            angular.element('html').animate({ scrollTop: alertContainer.offset().top }, 350);
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
        * Confirm modal.
        * @param {String} body Required. String body.
        * @param {Function} yesFn Required. Call when yes button click.
        * @param {Function} noFn Optional. Call when no or close button click.
        */
        function drlConfirm(body, yesFn, noFn = angular.noop) {
            let confirmContainer = angular.element('body'),
                confirmComponent = `<drl-confirm yes-fn="yesFn()" no-fn="noFn()">${body}</drl-confirm>`,
                confirmScope = Object.assign($rootScope.$new(), {
                    yesFn: () => {
                        yesFn();
                        confirmScope.$destroy();
                    },
                    noFn: () => {
                        noFn();
                        confirmScope.$destroy();
                    }
                });
            confirmContainer.append($compile(confirmComponent)(confirmScope));
        }

        /**
         * Show alert danger when status is not 200. Split response by status data. Call by service.
         * @param {Object} response Required. Response from $http request.
         */
        function showAlertWhenError(request) {
            let q = $q.defer();
            request.then(res => {
                if (res.data !== null) {
                    if (res.data.status === 200) {
                        q.resolve(res);
                    } else {
                        drlLoading(false);
                        drlAlert('danger', res.data.message);
                        q.reject(res);
                    }
                } else {
                    drlLoading(false);
                    drlAlert('danger', res.statusText);
                    q.reject(res);
                }
            }).catch(err => {
                drlLoading(false);
                drlAlert('danger', err.statusText);
                q.reject(err);
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
                .withOption('order', [])
                .withPaginationType('simple_numbers')
                .withLanguage({
                    oPaginate: {
                        sNext: '<i class="fa fa-angle-right"></i>',
                        sPrevious: '<i class="fa fa-angle-left"></i>'
                    }
                });
            return dtOptions;
        }

        /**
         * Datatable zero configuration.
         * @param {String} selector Required. Selector of id or class of table element.
         * @param {Object} additionalConfig Optional. Additional config of datatable.
         */
        function DTZeroConfig(selector, additionalConfig = {}) {
            $timeout(() => {
                angular.element(selector).DataTable(Object.assign({
                    lengthMenu: [[5, 10, 20, -1], [5, 10, 20, 'All']],
                    language: {
                        paginate: {
                            next: '<i class="fa fa-angle-right"></i>',
                            previous: '<i class="fa fa-angle-left"></i>'
                        }
                    }
                }, additionalConfig));
            });
        }

        /**
         * Change object to form data.
         * @param {Object} obj Required. Object will convert.
         */
        function objectToFormData(obj) {
            let fd = new FormData();
            Object.keys(obj).forEach(key => fd.append(key, obj[key]));
            return fd;
        };
    }
})();