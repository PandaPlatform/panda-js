(function ($) {
    'use strict';

    /**
     * Panda Base Cache Service
     * @type {void|Object|*}
     */
    Panda.Cache = $.extend(true, Panda.Cache || {}, {
        /**
         * Set the default cache
         */
        cache: {},

        /**
         * Get a value from the cache
         *
         * @param name
         * @returns {*}
         */
        get: function (name) {
            return this.cache[name];
        },

        /**
         * Set a value to the cache
         *
         * @param name
         * @param value
         */
        set: function (name, value) {
            this.cache[name] = value;
        },

        /**
         * Clear the cache
         */
        clear: function () {
            this.cache = {};
        }
    });
})(jQuery);
