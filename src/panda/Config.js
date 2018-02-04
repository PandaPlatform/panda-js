(function ($) {
    'use strict';

    /**
     * Panda Base Config Service
     * @type {Object}
     */
    Panda.Config = $.extend(true, Panda.Registry || {}, {
        /**
         * Get a value from the config
         *
         * @param {string} name
         * @returns {*}
         */
        get: function (name) {
            return this.getConfig()[name];
        },

        /**
         * Set a value to the config
         *
         * @param {string} name
         * @param {string|number|object} value
         */
        set: function (name, value) {
            // Get config
            var config = this.getConfig();

            // Set value
            config[name] = $.extend(true, config[name], value || {});

            // Set config back
            this.setConfig(config);
        },

        /**
         * Get the entire config from the registry
         *
         * @return {object}
         */
        getConfig: function () {
            return this.registry['config'];
        },

        /**
         * @param {object} config
         */
        setConfig: function (config) {
            this.registry['config'] = $.extend(true, this.registry['config'], config || {});
        },

        /**
         * Clear the config
         */
        clear: function () {
            this.registry['config'] = {};
        }
    });
})(jQuery);
