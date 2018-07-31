(function ($) {
    'use strict';

    /**
     * Panda Debugger Service
     * @type {void|Object|*}
     */
    Panda.Debug.Debugger = $.extend(true, Panda.Debug.Debugger || {}, {
        debugger: false,

        /**
         * Get the current status of the debugger
         *
         * @returns {boolean}
         */
        status: function () {
            return (this.debugger || Panda.Env.Cookies.get("pdebug"));
        },

        /**
         * Set the debugger status
         *
         * @param {boolean} status
         */
        setStatus: function (status) {
            this.debugger = status;
        },

        /**
         * Activate the debugger
         */
        on: function () {
            this.setStatus(true);
        },

        /**
         * Deactivate the debugger
         */
        off: function () {
            this.setStatus(false);
        }
    });
})(jQuery);
