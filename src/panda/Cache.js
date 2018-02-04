(function ($) {
    'use strict';

    /**
     * Panda Base Cache Service
     * @type {Object}
     */
    Panda.Cache = $.extend(true, Panda.Registry || {}, {
        /**
         * Get a value from the cache
         *
         * @param {string} name
         * @returns {*}
         */
        get: function (name) {
            return this.getCache()[name];
        },

        /**
         * Set a value to the cache
         *
         * @param {string} name
         * @param {string|number|object} value
         */
        set: function (name, value) {
            // Get cache
            var cache = this.getCache();

            // Set value
            cache[name] = $.extend(true, cache[name], value || {});

            // Set cache back
            this.setCache(cache);
        },

        /**
         * Get the entire cache from the registry
         *
         * @return {object}
         */
        getCache: function () {
            return this.registry['cache'];
        },

        /**
         * @param {object} cache
         */
        setCache: function (cache) {
            this.registry['cache'] = $.extend(true, this.registry['cache'], cache || {});
        },

        /**
         * Clear the cache
         */
        clear: function () {
            this.registry['cache'] = {};
        }
    });
})(jQuery);
