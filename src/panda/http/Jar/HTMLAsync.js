(function ($) {
    'use strict';

    /**
     * Panda Html Async Request Handler Service
     * @type {void|Object|*}
     */
    Panda.Http.Jar.HTMLAsync = $.extend(true, Panda.Http.Jar.HTMLAsync || {}, {
        /**
         * Make an async request and pre-parse the response.
         *
         * @param {String} url
         * @param {String} method
         * @param {Object} data
         * @param {Object} sender
         * @param {Boolean} loading
         * @param {Object} asyncParameters
         * @param {Object} options
         * @returns {*}
         */
        request: function (url, method, data, sender, loading, asyncParameters, options) {
            // Use new function
            return Panda.Http.Jar.JSONAsync.request(url, method, data, sender, loading, options).then(function (response) {
                return Panda.Http.Jar.HTMLAsync.parseResponseContent(sender, response, asyncParameters);
            });
        },

        /**
         * Parse server response events, trigger to document.
         *
         * @param {Object} sender
         * @param {Object} response
         * @param {Object} asyncParameters
         * @returns {*}
         */
        parseResponseContent: function (sender, response, asyncParameters) {
            // Get sender data
            var startup = sender.attr("data-startup") || sender.data("startup");
            startup = (startup === "" && $.type(startup) !== "undefined" ? true : startup);

            // Remove startup attribute
            if (startup) {
                $(sender).data("startup", true).removeAttr("data-startup");
            }

            // Check if sender is in document, If not, reject report content
            if (startup && !$.contains(document, $(sender).get(0))) {
                Panda.Console.log('The sender of the report does no longer exist in the document.');
                throw new Error('The sender of the report does no longer exist in the document.');
            }

            // Load body payload
            var contentModified = false;
            for (var key in response) {
                var responseContent = response[key];
                var reportType = responseContent.type;

                // Take action according to result type
                switch (reportType) {
                    case "data":
                    case "html":
                        contentModified = Panda.Http.Jar.HTMLAsync.parseHtmlContent(sender, responseContent, asyncParameters, startup);

                        break;
                    case "popup":
                        $(sender).popup($(responseContent.payload));
                        contentModified = true;
                        break;
                }
            }

            // Trigger panda.content.modified if content actually modified
            if (contentModified) {
                $(document).trigger("panda.content.modified");
            }

            return response;
        },

        /**
         * Parse the given html response.
         *
         * @param {Object} sender
         * @param {Object} responseContent
         * @param {Object} attributes
         * @param {Boolean} startup
         * @returns {boolean}
         */
        parseHtmlContent: function (sender, responseContent, attributes, startup) {
            // If there is no content, trigger modification and exit
            if ($(responseContent.payload).length === 0) {
                return false;
            }

            // Get holder
            var jqHolder = this.getHolder(sender, responseContent, attributes, startup);

            // Get method
            var method = this.getMethod(responseContent, attributes);

            // Append content to holder
            switch (method) {
                case 'replace':
                    // Remove old contents if replace
                    jqHolder.contents().remove();
                    $(responseContent.payload).appendTo(jqHolder);
                    break;
                case 'append':
                    $(responseContent.payload).appendTo(jqHolder);
                    break;
                case 'prepend':
                    $(responseContent.payload).prependTo(jqHolder);
                    break;
            }

            return true;
        },

        /**
         * Get the html holder for the given set of parameters.
         *
         * @param {Object} sender
         * @param {Object} responseContent
         * @param {Object} attributes
         * @param {Boolean} startup
         *
         * @returns {Object}
         */
        getHolder: function (sender, responseContent, attributes, startup) {
            // Get Report Parameters
            var dataHolder = null;

            // If sender is loading at startup, set default holder as sender
            if (startup === true && dataHolder === null) {
                dataHolder = sender;
            } else if (attributes !== undefined) {
                dataHolder = attributes['holder'];
            }

            // If sender has no holder, get holder from response content
            if ($.type(dataHolder) === "undefined" || dataHolder === null || dataHolder === "") {
                dataHolder = responseContent['holder'];
            }

            // If no holder is given anywhere, get sender
            if ($.type(dataHolder) === "undefined" || dataHolder === null || dataHolder === "") {
                dataHolder = sender;
            }

            var jqHolder = $(dataHolder, sender).first();
            if (jqHolder.length === 0) {
                jqHolder = $(dataHolder).first();
            }

            return jqHolder;
        },

        /**
         * Get the method to apply content to the page.
         *
         * @param {Object} responseContent
         * @param {Object} attributes
         * @returns {String}
         */
        getMethod: function (responseContent, attributes) {
            // Get Report Parameters
            var method = null;

            // Get method from attributes
            if (attributes !== undefined) {
                method = attributes['method'];
            }

            // Get method from response
            if ($.type(method) === "undefined" || method === null || method === "") {
                method = responseContent['method'];
            }

            return method;
        }
    });
})(jQuery);
