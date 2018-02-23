(function ($) {
    'use strict';

    /**
     * Panda Url Service
     * @type {void|Object|*}
     */
    Panda.Env.Url = $.extend(true, Panda.Env.Url || {}, {
        /**
         * Get all information about the current url
         *
         * @return {{protocol: string, sub: string, domain: string, pathname: *, hash: string}}
         */
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

            // Create object of all url information
            return {
                protocol: window.location.protocol.replace(':', ''),
                sub: sub,
                domain: parts.join('.'),
                pathname: this.getPathname(),
                hash: window.location.hash.substr(1)
            };
        },

        /**
         * Get the current url's pathname
         *
         * @return {string}
         */
        getPathname: function () {
            return encodeURIComponent(window.location.pathname);
        },

        /**
         * Get the current url's domain
         *
         * @return {string}
         */
        getDomain: function () {
            var info = this.info();
            return info.domain;

        },

        /**
         * Get the current url's sub-domain
         *
         * @return {string}
         */
        getSubDomain: function () {
            var info = this.info();
            return info.sub;
        },

        /**
         * Get a variable value from the current url
         *
         * @param {string} name
         * @return {string}
         */
        getVar: function (name) {
            return Panda.Env.Url.getUrlVar(window.location.href, name);
        },

        /**
         * Get a variable value from a given url.
         * If no variable is found for the given name, return all variables.
         *
         * @param {string} url
         * @param {string} name
         * @return {string|object}
         */
        getUrlVar: function (url, name) {
            var vars = {};
            url = url.split('#')[0];
            url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
                if (key in vars) {
                    if (typeof vars[key] === 'string') {
                        vars[key] = [vars[key]];
                    }
                    vars[key] = $.merge(vars[key], [value]);
                } else
                    vars[key] = value;
            });

            if (typeof(name) !== 'undefined') {
                return vars[name];
            }

            return vars;
        },

        /**
         * Remove a variable from a given url
         *
         * @param {string} url
         * @param {string} name
         * @return {string}
         */
        removeVar: function (url, name) {
            // If URL has no variables, return it
            if (url.indexOf('?') === -1) {
                return url;
            }

            // Split variables from URI
            var path_parts = url.split('?');
            var prefix = path_parts[0];
            var variables_part = '?' + path_parts[1];

            // Remove variable using patterns
            var var_pattern = new RegExp(name + '=(?=[^&]*)[^&]*[&*]|[&*]' + name + '=(?=[^&]*)[^&]*|^\\?' + name + '=(?=[^&]*)[^&]*$', 'i');
            variables_part = variables_part.replace(var_pattern, '');
            return prefix + variables_part;
        },

        /**
         * Redirect user to the given url
         *
         * @param {string} url
         */
        redirect: function (url) {
            window.location = url;
            window.location.href = url;
        },

        /**
         * Reload the current page
         *
         * @param {boolean} forceGet
         */
        reload: function (forceGet) {
            forceGet = (typeof forceGet === 'undefined') ? false : forceGet;
            window.location.reload(forceGet);
        }
    });
})(jQuery);
