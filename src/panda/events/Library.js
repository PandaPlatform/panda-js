(function ($) {
    'use strict';

    /**
     * Panda Events Library Service
     * @type {void|Object|*}
     */
    Panda.Events.Library = $.extend(true, Panda.Events.Library || {}, {
        /**
         * Register generic events and their callbacks
         */
        init: function () {
            // Redirect
            Panda.Events.on(document, 'window.redirect', '', function (ev, url) {
                Panda.Env.Url.redirect(url);
            });

            // Reload
            Panda.Events.on(document, 'window.reload', '', function (ev) {
                Panda.Env.Url.reload(false);
            });
        }
    });
})(jQuery);
