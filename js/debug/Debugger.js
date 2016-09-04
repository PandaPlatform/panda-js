var Panda = Panda || {};
Panda.Debug = Panda.Debug || {};

(function () {
    Panda.Debug.Debugger = {
        status: function () {
            var debuggerStatus = Panda.Env.Cookies.get("dbgr");
            return (debuggerStatus != null);
        }
    };
})();