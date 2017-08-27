/*!
 * Panda JavaScript Library v1.3.1
 * https://pandaphp.org
 *
 * Copyright JS Ioannis Papikas
 * Released under the MIT license
 * https://pandaphp.org/js/license
 */
var Panda = Panda || {};

(function ($) {
    'use strict';

    /**
     * Panda Main Package
     * @type {void|Object|*}
     */
    Panda = $.extend(true, Panda || {}, {
        version: '1.3.1',

        /**
         * Initialize all Packages
         */
        init: function () {
            Panda.Env.init();
            Panda.Events.init();
            Panda.Http.init();
        }
    });
})(jQuery);
