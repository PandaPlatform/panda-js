(function ($) {
    'use strict';

    Panda.Http.Jar.HTMLAsync = $.extend(Panda.Http.Jar.HTMLAsync || {}, {
        request: function (serverUrl, method, requestData, sender, loading, callType, options) {
            // Use new function
            return Panda.Http.Jar.JSONAsync.request(serverUrl, method, requestData, sender, loading, options).then(function (response) {
                return Panda.Http.Jar.HTMLAsync.parseResponseContent(sender, response, callType);
            });
        },
        // Parse server response events, trigger to document
        parseResponseContent: function (sender, response, callType) {
            // Get sender data
            var startup = sender.attr("data-startup") || sender.data("startup");
            startup = (startup === "" && $.type(startup) !== "undefined" ? true : startup);

            // Remove startup attribute
            if (startup) {
                $(sender).data("startup", true).removeAttr("data-startup");
            }

            // Check if sender is in document, If not, reject report content
            if (startup && !$.contains(document, $(sender).get(0))) {
                Panda.Debug.Logger.log('The sender of the report does no longer exist in the document.');
                throw new Error('The sender of the report does no longer exist in the document.');
            }

            // Load body payload
            var contentModified = false;
            for (var key in response) {
                var responseContent = response[key];
                var payload = responseContent.payload;
                var reportType = responseContent.type;

                // Take action according to result type
                switch (reportType) {
                    case "data":
                    case "html":
                        contentModified = Panda.Http.Jar.HTMLAsync.parseHtmlContent(sender, payload, sender.data(callType), startup);

                        break;
                    case "popup":
                        $(sender).popup($(payload.html));
                        contentModified = true;
                        break;
                }
            }

            // Trigger panda.content.modified if content actually modified
            if (contentModified) {
                $(document).trigger("panda.content.modified");
            }

            return response;
        },
        parseHtmlContent: function (sender, payload, attributes, startup) {
            // If there is no content, trigger modification and exit
            if ($(payload).length === 0) {
                return false;
            }

            // Get Report Parameters
            var dataHolder = null;
            // If sender is loading at startup, set default holder as sender
            if (startup === true && dataHolder === null) {
                dataHolder = sender;
            } else if (attributes !== undefined) {
                dataHolder = attributes.holder;
            }

            // If sender has no holder, get holder from payload
            if ($.type(dataHolder) === "undefined" || dataHolder === null || dataHolder === "") {
                dataHolder = payload.holder;
            }

            // If no holder is given anywhere, get sender
            if ($.type(dataHolder) === "undefined" || dataHolder === null || dataHolder === "") {
                dataHolder = sender;
            }

            var jqHolder = $(dataHolder, sender).first();
            if (jqHolder.length === 0) {
                jqHolder = $(dataHolder).first();
            }

            // Append content to holder
            switch (payload.method) {
                case 'replace':
                    // Remove old contents if replace
                    jqHolder.contents().remove();
                    $(payload.html).appendTo(jqHolder);
                    break;
                case 'append':
                    $(payload.html).appendTo(jqHolder);
                    break;
                case 'prepend':
                    $(payload.html).prependTo(jqHolder);
                    break;
            }

            return true;
        },
        // Get the response payload's content
        getPayloadContent: function (responsePayload) {
            return responsePayload.content;
        }
    });
})(jQuery);
