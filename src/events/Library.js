Panda = Panda || {};
Panda.Events = Panda.Events || {};

(function ($) {
    Panda.Events.Library = $.extend(Panda.Events.Library || {}, {
        init: function () {
            // Redirect
            Panda.Events.on(document, 'window.redirect', '', function (ev, url) {
                Panda.Env.Url.redirect(url);
            });

            // Reload
            Panda.Events.on(document, 'window.reload', '', function (ev) {
                Panda.Env.Url.reload();
            });
        }
    });

    // Initialize
    Panda.Events.Library.init();
})(jQuery);
