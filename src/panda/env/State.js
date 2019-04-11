(function ($) {
    'use strict';

    /**
     * Panda State Service
     * @type {void|Object|*}
     */
    Panda.Env.State = $.extend(true, Panda.Env.State || {}, {
        statePushed: false,
        currentState: null,
        init: function () {
            // Get current state
            this.currentState = window.location.pathname;
        },
        addListeners: function () {
            // Add listeners
            $(window).on('popstate', function (ev) {
                // If it's a reload event and not a push state, ignore this trigger
                if (!this.statePushed) {
                    return;
                }

                var path_name = window.location.pathname;
                var found = false;
                var reg_exp = path_name + "$";
                var match_reg_exp = new RegExp(reg_exp);

                // Check if the path name is the same
                if (path_name === Panda.Env.State.currentState || Panda.Env.State.currentState.match(match_reg_exp)) {
                    return;
                }

                // Find weblink with the same location href
                $("a").each(function () {
                    if ($.type($(this).attr('href')) !== "undefined" && $(this).attr('href').match(match_reg_exp)) {
                        found = true;
                        $(this).click();
                        return false;
                    }
                });

                // If weblink not found, reload the page
                if (!found) {
                    location.reload(true);
                }
            });
        },
        push: function (state, callback) {
            if (window.location.href !== state && (state !== "" && state !== "#" && $.type(state) !== "undefined")) {
                window.history.pushState(Date.now(), "Title", state);
                this.statePushed = true;

                // Trigger callback
                if (typeof callback === 'function') {
                    callback.call();
                }

                // Set current state
                this.currentState = state;
            }
        }
    });
})(jQuery);
