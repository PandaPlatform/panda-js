(function () {
    'use strict';

    /**
     * Panda Logger Service
     * @type {void|Object|*}
     * @deprecated Use Panda.Console instead
     */
    Panda.Debug.Logger = $.extend(true, Panda.Debug.Logger || {}, {
        logger: false,

        status: function () {
            return (this.logger || Panda.Env.Cookies.get("plogger") || Panda.Debug.Debugger.status());
        },
        log: function (content) {
            if (this.status()) {
                console.log(content);
            }
        },
        dir: function (content) {
            if (this.status()) {
                console.dir(content);
            }
        },
        dirxml: function (content) {
            if (this.status()) {
                console.dirxml(content);
            }
        }
    });
})(jQuery);
