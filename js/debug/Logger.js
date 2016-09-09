var Panda = Panda || {};
Panda.Debug = Panda.Debug || {};

(function () {
    Panda.Debug.Logger = {
        status: function () {
            return (Panda.Env.Cookies.get("lggr") == "");
        },
        log: function (content) {
            if (this.status() || Panda.Debug.Debugger.status())
                console.log(content);
        },
        dir: function (content) {
            if (this.status() || Panda.Debug.Debugger.status())
                console.dir(content);
        },
        dirxml: function (content) {
            if (this.status() || Panda.Debug.Debugger.status())
                console.dirxml(content);
        }
    };
})();