Panda = Panda || {};
Panda.Debug = Panda.Debug || {};

(function () {
    Panda.Debug.Debugger = $.extend(Panda.Debug.Debugger || {}, {
        status: function () {
            var debuggerStatus = Panda.Env.Cookies.get("pdebug");
            return (debuggerStatus !== null);
        }
    });
})(jQuery);
