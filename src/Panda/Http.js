(function () {
    'use strict';

    /**
     * Panda Base Http Package
     * @type {void|Object|*}
     */
    Panda.Http = $.extend(Panda.Http || {}, {
        init: function () {
            Panda.Http.Async.init();
        }
    });
})(jQuery);
