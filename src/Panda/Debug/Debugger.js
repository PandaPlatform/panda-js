(function () {
    'use strict';

    /**
     * Panda Debugger Package
     * @type {void|Object|*}
     */
    Panda.Debug.Debugger = $.extend(true, Panda.Debug.Debugger || {}, {
        debugger: false,

        /**
         * Get the current status of the debugger.
         * @returns {boolean|*}
         */
        status: function () {
            return (this.debugger || Panda.Env.Cookies.get("pdebug"));
        }
    });
})(jQuery);
