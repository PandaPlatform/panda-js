(function ($) {
    'use strict';

    Panda.Events = $.extend(Panda.Events || {}, {
        init: function () {
            // Register global events
            Panda.Events.Library.init();
        },
        on: function (listener, event, context, callback) {
            $(listener).on(event, context, function () {
                if (typeof callback === 'function') {
                    callback.apply(this, Array.prototype.slice.call(arguments));
                }
            });
        },
        one: function (listener, event, context, callback) {
            $(listener).one(event, context, function () {
                if (typeof callback === 'function') {
                    callback.apply(this, Array.prototype.slice.call(arguments));
                }
            });
        },
        off: function (listener, event, context) {
            $(listener).off(event, context);
        },
        dispatch: function (listener, event, callback) {
            $(listener).trigger(event, callback);
        }
    });
})(jQuery);
