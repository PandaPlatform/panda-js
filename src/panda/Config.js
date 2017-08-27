(function ($) {
    'use strict';

    /**
     * Panda Base Configuration Service
     * This Service manages the entire Configuration and provides
     * proper getters and setters for the main config.
     *
     * @type {void|Object|*}
     */
    Panda.Config = $.extend(true, Panda.Config || {}, {
        /**
         * Set the default configuration
         */
        config: {},

        /**
         * @param name
         * @returns {*}
         */
        get: function (name) {
            return this.config[name];
        },

        /**
         * @param name
         * @param values
         */
        set: function (name, values) {
            this.config[name] = $.extend(true, this.config[name], values || {});
        },

        /**
         * @param config
         */
        setConfig: function (config) {
            this.config = $.extend(true, this.config, config || {});
        }
    });
})(jQuery);
