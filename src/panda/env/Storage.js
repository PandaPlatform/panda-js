(function ($) {
    'use strict';

    /**
     * Panda Storage Service
     * @type {Object}
     */
    Panda.Env.Storage = $.extend(true, Panda.Env.Storage || {}, {
        /**
         * Set a value to the browser's storage.
         *
         * @param {string} name
         * @param {*} value
         * @param {boolean} persistent
         * @return {boolean}
         */
        set: function (name, value, persistent) {
            // Check if Storage is supported
            if (typeof(Storage) === "undefined") {
                return false;
            }

            // Get Storage Handler
            var storageHandler = this.getStorage(persistent);

            // Check state and convert to JSON if possible
            if ($.type(value) === "array" || typeof(value) === "object") {
                try {
                    value = JSON.stringify(value);
                } catch (err) {
                    return false;
                }
            }

            // If not string, try to convert to string
            if (typeof(value) !== "string") {
                try {
                    value = String(value);
                } catch (err) {
                    return false;
                }
            }

            // Set item value to Storage
            storageHandler.setItem(name, value);

            return true;
        },

        /**
         * Get a value from the browser's storage.
         *
         * @param {string} name
         * @param {boolean} persistent
         * @return {*}
         */
        get: function (name, persistent) {
            // Check if Storage is supported
            if (typeof(Storage) === "undefined") {
                return false;
            }

            // Get Storage Handler
            var storageHandler = this.getStorage(persistent);

            // Get item value from storage
            var value = storageHandler.getItem(name);

            try {
                value = $.parseJSON(value);
            } catch (err) {
            }

            // Return storage value
            return value;
        },

        /**
         * Remove a variable from the browser's storage.
         *
         * @param {string} name
         * @param {boolean} persistent
         * @return {boolean}
         */
        remove: function (name, persistent) {
            // Check if Storage is supported
            if (typeof(Storage) === "undefined") {
                return false;
            }

            // Get Storage Handler
            var storageHandler = this.getStorage(persistent);

            // Remove item from Storage
            storageHandler.removeItem(name);

            return true;
        },

        /**
         * Get the proper Storage handler.
         *
         * @param {boolean} persistent
         * @return {Storage}
         */
        getStorage: function (persistent) {
            // Set sessionStorage as default Storage handler
            if (typeof(persistent) === "undefined") {
                persistent = false;
            }

            return persistent ? localStorage : sessionStorage;
        }

    });
})(jQuery);
