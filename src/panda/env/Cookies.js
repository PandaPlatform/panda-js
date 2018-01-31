(function () {
    'use strict';

    /**
     * Panda Cookies Service
     * @type {void|Object|*}
     */
    Panda.Env.Cookies = $.extend(true, Panda.Env.Cookies || {}, {
        /**
         * Get cookie value
         *
         * @param {string} name
         * @return {*}
         */
        get: function (name) {
            var i, b, c;
            var documentCookies = document.cookie.split(";");
            for (i = 0; i < documentCookies.length; i++) {
                b = documentCookies[i].substr(0, documentCookies[i].indexOf("="));
                c = documentCookies[i].substr(documentCookies[i].indexOf("=") + 1);
                b = b.replace(/^\s+|\s+$/g, "");
                var flag = (b === name);
                if (flag) {
                    return encodeURIComponent(c);
                }
            }

            return null;
        },

        /**
         * Set a cookie value
         *
         * @param {string} name
         * @param {string} value
         * @param {Date} expireDate
         * @param {string} path
         */
        set: function (name, value, expireDate, path) {
            // Add backwards compatible check for days
            if (typeof expireDate === 'number') {
                var expireDays = expireDate;
                expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + expireDays);
            }

            // Set cookie
            var domain = Panda.Env.Url.getDomain();
            var c_value = encodeURIComponent(value) + "; domain=." + domain + "; path=" + path + ";" + ((exdays === null || exdays === 0) ? "" : "expires=" + expireDate.toUTCString());
            document.cookie = name + "=" + c_value;
        }
    });
})(jQuery);
