(function ($) {
    'use strict';

    /**
     * Panda Base Registry Service
     * @type {Object}
     */
    Panda.Registry = $.extend(true, Panda.Registry || {}, {
        /**
         * Registry container
         */
        registry: {},

        /**
         * Get a value from the registry
         *
         * @param name
         * @returns {*}
         */
        get: function (name) {
            return this.registry[name];
        },

        /**
         * Set a value to the registry
         *
         * @param {string} name
         * @param {string|number|object} value
         */
        set: function (name, value) {
            this.registry[name] = $.extend(true, this.registry[name], value || {});
        },

        /**
         * Clear the registry
         */
        clear: function () {
            this.registry = {};
        }
    });
})(jQuery);
