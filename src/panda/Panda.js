var Panda = Panda || {};

(function ($) {
    'use strict';

    Panda = $.extend(Panda || {}, {
        init: function () {
            // Initialize Panda Libraries
            Panda.Env.State.init();
            Panda.Events.Library.init();
            Panda.Http.Async.init();
        }
    });
})(jQuery);
