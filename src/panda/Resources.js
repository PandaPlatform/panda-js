(function ($) {
    'use strict';

    /**
     * Panda Base Resources Service
     * It manages resources such as loading, translating etc.
     * It uses Cache for faster loading and better performance.
     *
     * Extend this Service to define the resource url getter.
     *
     * @type {void|Object|*}
     */
    Panda.Resources = $.extend(true, Panda.Resources || {}, {
        /**
         * Get a resource file and its contents.
         *
         * @param {string} url
         * @param {string} type
         * @returns {Promise}
         */
        getResourceFile: function (url, type) {
            // Check cache
            var fromCache = Panda.Cache.get(url);
            if (fromCache) {
                return new Promise(function (resolve) {
                    resolve(fromCache);
                });
            }

            // Get resource from http
            return Panda.Http.Async.request(url, 'GET', [], this, {
                dataType: type
            }).then(function (response) {
                // Add to cache
                Panda.Cache.set(url, response);

                // Return response
                return response;
            });
        },

        /**
         * Load an external javascript file.
         *
         * @param href
         * @returns {*}
         */
        loadJs: function (href) {
            return this.getResourceFile(href, 'html').then(function (response) {
                $('<script />')
                    .attr('type', 'text/javascript')
                    .html(response)
                    .appendTo($('head'));
            });
        },

        /**
         * Load an external css files.
         *
         * @param href
         * @returns {*}
         */
        loadCss: function (href) {
            return this.getResourceFile(href, 'html').then(function (response) {
                $('<style />')
                    .attr('type', 'text/css')
                    .html(response)
                    .appendTo($('head'));
            });
        }
    });
})(jQuery);
