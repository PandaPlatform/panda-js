(function ($) {
    'use strict';

    /**
     * Panda Base Events Service
     * @type {void|Object|*}
     */
    Panda.Events = $.extend(Panda.Events || {}, {
        /**
         * Initialize the Panda Events Library
         */
        init: function () {
            // Register global events
            Panda.Events.Library.init();
        },

        /**
         * Add an event listener using jQuery's 'on'
         *
         * @param {object|string} listener
         * @param {string} event
         * @param {string} context
         * @param {function} callback
         */
        on: function (listener, event, context, callback) {
            $(listener).on(event, context, function () {
                if (typeof callback === 'function') {
                    callback.apply(this, Array.prototype.slice.call(arguments));
                }
            });
        },

        /**
         * Add an event listener using jQuery's 'one'
         *
         * @param {object|string} listener
         * @param {string} event
         * @param {string} context
         * @param {function} callback
         */
        one: function (listener, event, context, callback) {
            $(listener).one(event, context, function () {
                if (typeof callback === 'function') {
                    callback.apply(this, Array.prototype.slice.call(arguments));
                }
            });
        },

        /**
         * Remove an event listener.
         *
         * @param {object|string} listener
         * @param {string} event
         * @param {string} context
         */
        off: function (listener, event, context) {
            $(listener).off(event, context);
        },

        /**
         * Trigger a specific event
         *
         * @param {object|string} listener
         * @param {string} event
         * @param {function} callback
         */
        dispatch: function (listener, event, callback) {
            $(listener).trigger(event, callback);
        }
    });
})(jQuery);
