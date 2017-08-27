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
         * Get a resource url
         *
         * @param {string} path
         * @returns {string}
         */
        getResourceUrl: function (path) {
        },

        /**
         * Get a resource file and its contents.
         *
         * @param {string} path
         * @param {string} type
         * @returns {Promise}
         */
        getResourceFile: function (path, type) {
            // Get resource url
            var resourceUrl = this.getResourceUrl(path);

            // Check cache
            var fromCache = Panda.Cache.get(resourceUrl);
            if (fromCache) {
                return new Promise(function (resolve) {
                    resolve(fromCache);
                });
            }

            // Get resource from http
            return Panda.Http.Async.request(resourceUrl, 'GET', [], this, {
                dataType: type
            }).then(function (response) {
                // Add to cache
                Panda.Cache.set(resourceUrl, response);

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
            return this.getResourceFile(href, 'js').then(function (response) {
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
            return this.getResourceFile(href, 'css').then(function (response) {
                $('<style />')
                    .attr('type', 'text/css')
                    .html(response)
                    .appendTo($('head'));
            });
        }
    });
})(jQuery);
