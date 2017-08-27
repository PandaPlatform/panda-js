(function () {
    'use strict';

    /**
     * Panda Cookies Service
     * @type {void|Object|*}
     */
    Panda.Env.Cookies = $.extend(true, Panda.Env.Cookies || {}, {
        get: function (c_name) {
            var i, b, c;
            var documentCookies = document.cookie.split(";");
            for (i = 0; i < documentCookies.length; i++) {
                b = documentCookies[i].substr(0, documentCookies[i].indexOf("="));
                c = documentCookies[i].substr(documentCookies[i].indexOf("=") + 1);
                b = b.replace(/^\s+|\s+$/g, "");
                var flag = (b === c_name);
                if (flag) {
                    return encodeURIComponent(c);
                }
            }

            return null;
        },
        set: function (c_name, value, exdays, path) {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + exdays);
            var domain = Panda.Env.Url.getDomain();
            var c_value = encodeURIComponent(value) + "; domain=." + domain + "; path=" + path + ";" + ((exdays === null || exdays === 0) ? "" : "expires=" + expireDate.toUTCString());
            document.cookie = c_name + "=" + c_value;
        }
    });
})(jQuery);
