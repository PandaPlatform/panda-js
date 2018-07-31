(function ($) {
    'use strict';

    /**
     * Panda Base Environment Service
     * @type {void|Object|*}
     */
    Panda.Env = $.extend(true, Panda.Env || {}, {
        init: function () {
            Panda.Env.State.init();
        }
    });
})(jQuery);
