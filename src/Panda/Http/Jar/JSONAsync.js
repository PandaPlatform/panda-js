(function ($) {
    'use strict';

    Panda.Http.Jar.JSONAsync = $.extend(Panda.Http.Jar.JSONAsync || {}, {
        request: function (serverUrl, method, requestData, sender, loading, options) {
            // Use new function
            return Panda.Http.Jar.request(serverUrl, method, requestData, sender, loading, options).then(function (response) {
                // Parse report for actions
                return Panda.Http.Jar.JSONAsync.parseResponseEvents(sender, response);
            });
        },
        // Parse server report actions, trigger to document
        parseResponseEvents: function (sender, response) {
            // Load body payload
            for (var key in response) {
                var responseContent = response[key];
                var payload = Panda.Http.Jar.JSONAsync.getResponsePayload(responseContent);
                var reportType = responseContent.type;

                // Filter only actions and trigger to document
                switch (reportType) {
                    case 'action':
                    case 'event':
                        // Get event and trigger to document
                        var event = payload;
                        if ($.type(sender) !== "undefined" && $.contains(document.documentElement, sender.get(0)))
                            sender.trigger(event.name, event.value);
                        else
                            $(document).trigger(event.name, event.value);
                        break;
                }
            }
            return response;
        },
        // Get the response payload
        getResponsePayload: function (responseContent) {
            return responseContent.payload;
        }
    });
})(jQuery);
