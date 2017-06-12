Panda = Panda || {};
Panda.Env = Panda.Env || {};

(function ($) {
    Panda.Env.Storage = {
        set: function (name, value, persistent) {
            // Check if Storage is supported
            if (typeof(Storage) === "undefined") {
                return false;
            }

            // Don't keep state in session as default
            if (typeof(persistent) === "undefined") {
                persistent = false;
            }

            // Check state and convert to JSON if possible
            if ($.type(value) === "array" || typeof(value) === "object") {
                try {
                    value = JSON.stringify(value);
                } catch (err) {
                    return false;
                }
            }

            // If not string, try to convert to string
            if (typeof(value) !== "string") {
                try {
                    value = String(value);
                } catch (err) {
                    return false;
                }
            }

            // Set local storage
            if (persistent) {
                localStorage.setItem(name, value);
            } else {
                sessionStorage.setItem(name, value);
            }

            return true;
        },
        get: function (name, persistent) {
            // Check if Storage is supported
            if (typeof(Storage) === "undefined") {
                return false;
            }

            // Don't get state from session as default
            if (typeof(persistent) === "undefined") {
                persistent = false;
            }

            // Don't get state from session as default
            var value = null;
            if (persistent) {
                value = localStorage.getItem(name);
            } else {
                value = sessionStorage.getItem(name);
            }

            try {
                value = $.parseJSON(value);
            } catch (err) {
            }

            // Return storage value
            return value;
        },
        remove: function (name, persistent) {
            // Check if Storage is supported
            if (typeof(Storage) === "undefined") {
                return false;
            }

            // Don't get state from session as default
            if (typeof(persistent) === "undefined") {
                persistent = false;
            }

            // Don't get state from session as default
            if (persistent) {
                localStorage.removeItem(name);
            } else {
                sessionStorage.removeItem(name);
            }

            return true;
        }
    };
})(jQuery);
