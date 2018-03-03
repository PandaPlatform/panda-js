(function ($) {
    'use strict';

    /**
     * Panda Json Async Response Service
     * @type {void|Object|*}
     */
    Panda.Http.Jar = $.extend(true, Panda.Http.Jar || {}, {
        init: function () {
            Panda.Http.Jar.FormAsync.init();
        },

        /**
         * Make an ajax request and expect the response to be a Jar response.
         *
         * @param {string} ajaxUrl
         * @param {string} method
         * @param {object} requestData
         * @param {object} sender
         * @param {boolean} loading
         * @param {object} options
         * @return {PromiseLike<T>}
         */
        request: function (ajaxUrl, method, requestData, sender, loading, options) {
            // Set ajax extra options
            var ajaxOptions = {};
            ajaxOptions.dataType = 'json';
            ajaxOptions.loading = loading;
            ajaxOptions.withCredentials = true;

            // Extend options
            ajaxOptions = $.extend(true, ajaxOptions, options);

            // Use new function
            return Panda.Http.Async.request(ajaxUrl, method, requestData, sender, ajaxOptions).then(function (response) {
                return Panda.Http.Jar.handleResponse(response);
            });
        },

        /**
         * Handle an async Jar response.
         * The response must have headers and content, according to https://github.com/PandaPlatform/jar
         *
         * @param response
         * @return {*}
         */
        handleResponse: function (response) {
            // Check if report is not null
            if (!response) {
                Panda.Console.log('The server response is empty. Aborting content parsing.');
                return reject('The server response is empty. Aborting content parsing.');
            }

            // Check report integrity
            if (response.headers === undefined) {
                Panda.Console.log('Server Response does not contain a header element. Aborting content parsing.');
                return reject('Server Response does not contain a header element. Aborting content parsing.');
            }

            return response.content;
        },

        /**
         * Make an ajax request in the form of download.
         * It performs the download by opening an iFrame with the given downlaod url.
         *
         * @param {string} downloadUrl
         */
        downloadRequest: function (downloadUrl) {
            // Create HTMLFrame to download content
            var frameId = 'dl_frame_' + Math.round(Math.random() * 10000000);
            var jqFrame = this.getFrame(downloadUrl, '', frameId, '');
            jqFrame.css('display', 'none').appendTo('body');
        },

        /**
         * Create a simple iFrame element
         * @param {string} src
         * @param {string} name
         * @param {string} frameId
         * @param {string} frameClass
         * @return {HTMLElement}
         */
        getFrame: function (src, name, frameId, frameClass) {
            // Create item object
            var frameItem = $('<iframe/>').attr('id', frameId).addClass(frameClass);

            // Add source, name and sandbox
            frameItem.attr('name', name);
            frameItem.attr('src', src);

            // Return item
            return frameItem;
        }
    });
})(jQuery);
