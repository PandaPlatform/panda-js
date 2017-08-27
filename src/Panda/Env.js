(function () {
    'use strict';

    /**
     * Panda Base Environment Package
     * @type {void|Object|*}
     */
    Panda.Env = $.extend(true, Panda.Env || {}, {
        init: function () {
            Panda.Env.State.init();
        }
    });
})(jQuery);
