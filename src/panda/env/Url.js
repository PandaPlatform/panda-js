Panda = Panda || {};
Panda.Env = Panda.Env || {};

(function ($) {
    'use strict';

    Panda.Env.Url = $.extend(Panda.Env.Url || {}, {
        getVar: function (name) {
            return Panda.Env.Url.getUrlVar(window.location.href, name);
        },
        getUrlVar: function (url, name) {
            var vars = {};
            url = url.split('#')[0];
            url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                if (key in vars) {
                    if (typeof vars[key] === "string") {
                        vars[key] = [vars[key]];
                    }
                    vars[key] = $.merge(vars[key], [value]);
                } else
                    vars[key] = value;
            });

            if (typeof(name) !== "undefined") {
                return vars[name];
            }

            return vars;
        },
        removeVar: function (hrf, vrb) {
            // If URL has no variables, return it
            if (hrf.indexOf("?") === -1) {
                return hrf;
            }

            // Split variables from URI
            var hr_splitted = hrf.split("?");
            var prefix = hr_splitted[0];
            var vrbles_sec = "?" + hr_splitted[1];

            // Remove variable using patterns
            var var_patt = new RegExp(vrb + "=(?=[^&]*)[^&]*[&*]|[&*]" + vrb + "=(?=[^&]*)[^&]*|^\\?" + vrb + "=(?=[^&]*)[^&]*$", "i");
            vrbles_sec = vrbles_sec.replace(var_patt, "");
            return prefix + vrbles_sec;
        },
        redirect: function (url) {
            // If site is trusted
            window.location = url;
            window.location.href = url;
        },
        reload: function (forceGet) {
            forceGet = (typeof forceGet === 'undefined') ? false : forceGet;
            window.location.reload(forceGet);
        },
        getSubdomain: function () {
            var info = this.info();
            return info.sub;
        },
        getDomain: function () {
            var info = this.info();
            return info.domain;

        },
        info: function () {
            // Get init variables
            var fullHost = window.location.host;
            var parts = fullHost.split('.');

            // Set sub and domain
            var sub = 'www';
            if (parts.length > 2) {
                sub = parts[0];
                parts = parts.splice(1);
            }

            var info = {};
            info['protocol'] = window.location.protocol.replace(":", "");
            info['sub'] = sub;
            info['domain'] = parts.join(".");
            info['pathname'] = window.location.pathname;
            info['hash'] = window.location.hash.substr(1);

            return info;
        },
        getPathname: function () {
            return encodeURIComponent(window.location.pathname);
        },
        resolve: function (sub, url) {
            // Check if the url is already resolved
            if (url.indexOf("http") === 0) {
                return url;
            }

            // Check the subdomain
            var urlInfo = this.info();
            var urlProtocol = urlInfo['protocol'];
            var resolved_url = this.getDomain() + "/" + url;
            resolved_url = (sub === "www" ? "" : sub + ".") + resolved_url;
            return urlProtocol + "://" + resolved_url;
        },
        resource: function (url) {
            // Resolve url to www
            return this.resolve("www", url);
        }
    });
})(jQuery);
