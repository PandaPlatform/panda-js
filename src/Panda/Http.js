(function () {
    'use strict';

    Panda.Http = $.extend(Panda.Http || {}, {
        init: function () {
            Panda.Http.Async.init();
        }
    });
})(jQuery);
