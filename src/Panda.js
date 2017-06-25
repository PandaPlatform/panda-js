/*!
 * Panda JavaScript Library v1.2.0
 * https://pandaphp.org
 *
 * Copyright JS Ioannis Papikas
 * Released under the MIT license
 * https://pandaphp.org/js/license
 */
var Panda = Panda || {};

(function ($) {
    'use strict';

    Panda = $.extend(Panda || {}, {
        version: '1.2.0',
        init: function () {
            // Initialize Panda Libraries
            Panda.Env.init();
            Panda.Events.init();
            Panda.Http.init();
        }
    });
})(jQuery);
