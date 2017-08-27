(function ($) {
    'use strict';

    /**
     * Panda Base Console Service
     *
     * @type {void|Object|*}
     */
    Panda.Console = $.extend(true, Panda.Console || {}, {
        console: false,

        /**
         * Get the status of the console output.
         * @returns {boolean}
         */
        status: function () {
            return this.console || Panda.Env.Cookies.get("plogger") || Panda.Debug.Debugger.status();
        },

        /**
         * @param content
         */
        log: function (content) {
            if (this.status()) {
                console.log(content);
            }
        },

        /**
         * @param content
         */
        dir: function (content) {
            if (this.status()) {
                console.dir(content);
            }
        },

        /**
         * @param content
         */
        dirxml: function (content) {
            if (this.status()) {
                console.dirxml(content);
            }
        }
    });
})(jQuery);
