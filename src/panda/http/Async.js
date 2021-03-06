(function ($) {
    'use strict';

    /**
     * Panda Asynchronous Service for Http Requests
     * @type {void|Object|*}
     */
    Panda.Http.Async = $.extend(true, Panda.Http.Async || {}, {
        counter: 0,
        loadingCounter: 0,

        /**
         * Initialize Async listeners and events
         */
        init: function () {
            // Cancel async requests and trigger cancel event
            Panda.Events.on(document, 'keydown', function (ev) {
                switch (ev.which) {
                    // On escape key
                    case 27:
                        // Abort all requests in queue
                        var requests = $(document).data('panda-async-requests');
                        var keysToAbort = [];
                        for (var id in requests) {
                            // Abort request
                            requests[id].abort();

                            // Add key to array to abort
                            keysToAbort.push(requests[id].requestId);
                        }

                        // Remove data from document
                        $(document).removeData('panda-async-requests');

                        // Bubble ajax cancel.async event or trigger on document
                        $(document).trigger('panda.async.cancel', keysToAbort);
                }
            });
        },

        /**
         * Load a script asynchronously
         *
         * @param {string} script
         * @param {function} callback
         * @return {*}
         */
        getScript: function (script, callback) {
            // Get script
            return $.getScript(script, callback);
        },

        /**
         * Make an ajax request.
         *
         * @param {string} ajaxUrl
         * @param {string} method
         * @param {object} requestData
         * @param {object} sender
         * @param {object} ajaxOptions
         *
         * @return {PromiseLike}
         */
        request: function (ajaxUrl, method, requestData, sender, ajaxOptions) {
            // Request counter
            this.counter++;

            // Create request id
            var requestId = 'panda_async_request.' + (new Date()).getTime() + '_' + Math.floor(Math.random() * Math.pow(10, 10));

            // Init object for default ajax options
            var options = {
                url: ajaxUrl,
                type: method,
                data: requestData,
                context: sender,
                dataType: 'json',
                contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
                processData: false,
                cache: true,
                crossDomain: true,
                loading: false,
                xhrFields: {
                    withCredentials: false,
                    requestId: requestId
                }
            };

            // Extend ajax options
            options = $.extend(true, options, ajaxOptions);

            // Set Loading page
            if (options.loading) {
                this.loadingCounter++;
            }

            // Make request
            var request = $.ajax(options)
                .always(function (jqXHR, textStatus, errorThrown) {
                    // Decrease counter(s)
                    Panda.Http.Async.counter--;
                    if (options.loading) {
                        Panda.Http.Async.loadingCounter--;
                    }

                    // Delete request from queue
                    var requests = $(document).data('panda-async-requests');
                    delete requests[jqXHR.requestId];
                });

            // Add request to queue
            var requests = $(document).data('panda-async-requests');
            if ($.type(requests) === 'undefined') {
                requests = {};
            }
            requests[requestId] = request;

            // Set data
            $(document).data('panda-async-requests', requests);

            return request;
        }
    });
})(jQuery);
