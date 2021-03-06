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
         * @param {String} url
         * @param {String} method
         * @param {Object} data
         * @param {Object} sender
         * @param {Boolean} loading
         * @param {Object} options
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
         * @param {Object} sender
         * @param {Object} response
         * @returns {*}
         */
        parseResponseEvents: function (sender, response) {
            /**
             * Get response contents
             *
             * This is a solution to support both jQuery <=1.7 and >1.7
             *
             * The problem is in the promises where the promises do not return
             * the proper responses, so we have to handle both scenarios here.
             */
            var responseContents = response.content ? response.content : response;

            // Load body payload
            for (var key in responseContents) {
                var responseContent = responseContents[key];
                var payload = Panda.Http.Jar.JSONAsync.getResponsePayload(responseContent);
                var responseType = responseContent.type;

                // Filter only actions and trigger to document
                switch (responseType) {
                    case 'action':
                    case 'event':
                        // Trigger event to payload
                        if ($.type(sender) !== "undefined" && $.contains(document.documentElement, sender.get(0))) {
                            sender.trigger(payload.name, payload.value);
                        } else {
                            $(document).trigger(payload.name, payload.value);
                        }
                        break;
                }
            }

            return responseContents;
        },

        /**
         * Get the response payload based on the given response
         *
         * @param {Object} response
         * @returns {*}
         */
        getResponsePayload: function (response) {
            return response['payload'];
        }
    });
})(jQuery);
