(function ($) {
    'use strict';

    /**
     * Panda Json Async Request Handler Service
     * @type {void|Object|*}
     */
    Panda.Http.Jar.JSONAsync = $.extend(true, Panda.Http.Jar.JSONAsync || {}, {
        /**
         * Make an async request and pre-parse the response.
         *
         * @param url
         * @param method
         * @param data
         * @param sender
         * @param loading
         * @param options
         * @returns {*}
         */
        request: function (url, method, data, sender, loading, options) {
            // Use new function
            return Panda.Http.Jar.request(url, method, data, sender, loading, options).then(function (response) {
                // Parse report for actions
                return Panda.Http.Jar.JSONAsync.parseResponseEvents(sender, response);
            });
        },

        /**
         * Parse server report actions, trigger to document.
         *
         * @param sender
         * @param response
         * @returns {*}
         */
        parseResponseEvents: function (sender, response) {
            // Load body payload
            for (var key in response) {
                var responseContent = response[key];
                var payload = Panda.Http.Jar.JSONAsync.getResponsePayload(responseContent);
                var reportType = responseContent.type;

                // Filter only actions and trigger to document
                switch (reportType) {
                    case 'action':
                    case 'event':
                        // Get event and trigger to document
                        var event = payload;
                        if ($.type(sender) !== "undefined" && $.contains(document.documentElement, sender.get(0))) {
                            sender.trigger(event.name, event.value);
                        } else {
                            $(document).trigger(event.name, event.value);
                        }
                        break;
                }
            }
            return response;
        },

        /**
         * Get the response payload based on the given response
         * @param response
         * @returns {*}
         */
        getResponsePayload: function (response) {
            return response['payload'];
        }
    });
})(jQuery);
