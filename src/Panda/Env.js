(function () {
    'use strict';

    Panda.Env = $.extend(Panda.Env || {}, {
        init: function () {
            Panda.Env.State.init();
        }
    });
})(jQuery);
