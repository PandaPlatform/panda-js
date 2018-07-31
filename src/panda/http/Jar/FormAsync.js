(function ($) {
    'use strict';

    /**
     * PAnda Jar Form Async Handler Service
     * @type {void|Object|*}
     */
    Panda.Http.Jar.FormAsync = $.extend(true, Panda.Http.Jar.FormAsync || {}, {
        /**
         * Initialize Form Async service.
         */
        init: function () {
            // Initialize form submit
            $(document).on('submit', 'form[async]', function (ev) {
                // Stops the Default Action (if any)
                ev.preventDefault();

                // Submit form
                Panda.Http.Jar.FormAsync.submit(ev, $(this));
            });

            // Prevent Reload or Redirect on Form.edit
            $(window).on('beforeunload', function () {
                return Panda.Http.Jar.FormAsync.preventUnload();
            });

            // Set form prevent unload on edit all data-pu forms
            $(document).on('change', 'input, textarea, select', function () {
                if ($.type($(this).closest('form').data('pu')) !== 'undefined')
                    $(this).closest('form').data('preventUnload', true);
            });

            // Remove data-pu attr from forms
            $('form[data-pu]').each(function () {
                $(this).data('pu', $(this).data('pu')).removeAttr('data-pu');
            });

            // Form Async Listeners
            this.listen();
        },

        /**
         * Listen for specific events including the following:
         * - form.submit        -> submit
         * - form.reset         -> reset
         * - form.submitted     -> after submit
         */
        listen: function () {
            Panda.Events.off(document, 'form.submit', 'form');
            Panda.Events.on(document, 'form.submit', 'form', function () {
                $(this).submit();
            });
            Panda.Events.off(document, 'form.reset', 'form');
            Panda.Events.on(document, 'form.reset', 'form', function (ev, full) {
                Panda.Http.Jar.FormAsync.reset($(this), full);
            });
            Panda.Events.off(document, 'form.submitted', 'form');
            Panda.Events.on(document, 'form.submitted', 'form', function (ev, full) {
                $(this).removeData('preventUnload');
            });
        },

        /**
         * Check if there are forms that could prevent navigating away from this page
         *
         * @param {string} holder
         * @return {string}
         */
        preventUnload: function (holder) {
            // Get forms inside holder (if defined), otherwise get all forms
            var jqForms = null;
            if ($.type(holder) !== 'undefined') {
                jqForms = $(holder).find('form');
            } else {
                jqForms = $('form');
            }

            // Check for forms that prevent unload
            var formsPreventingUnload = jqForms.filter(function () {
                return $.type($(this).data('preventUnload')) !== 'undefined';
            });
            if (formsPreventingUnload.length > 0) {
                var pu = 'You are editing multiple forms right now. Do you want to leave without finishing?';
                if (formsPreventingUnload.length === 1) {
                    var fpu = formsPreventingUnload.first().data('pu');
                    if (fpu !== '1' && fpu !== 'true') {
                        pu = fpu;
                    } else {
                        pu = 'You are editing a form at the moment. Do you want to leave without finishing?'
                    }
                }

                return pu;
            }
        },

        /**
         * Submit a given form.
         * Check if the form has asynchronous submit enabled and use Panda.Http.Jar.HTMLAsync to submit.
         *
         * @param {object} jqForm
         * @return {*}
         */
        submit: function (jqForm) {
            // Check if form is already posting
            if (jqForm.data('posting') === true) {
                return false;
            }

            // Initialize posting
            jqForm.data('posting', true);

            // Form Parameters
            var formData = "";
            var urlVarsArray = "";
            if (jqForm.attr('enctype') === 'multipart/form-data') {
                // Initialize form data
                formData = new FormData();

                // Get url vars
                urlVarsArray = Panda.Env.Url.getUrlVar(window.location.href);
                for (var urli in urlVarsArray) {
                    formData.append(urli, urlVarsArray[urli]);
                }

                // Get form data
                var fdArray = jqForm.serializeArray();
                for (var fdi in fdArray) {
                    formData.append(fdArray[fdi].name, fdArray[fdi].value);
                }

                // Get files (if any)
                jqForm.find('input[type="file"]').each(function () {
                    if ($.type(this.files[0]) !== 'undefined') {
                        formData.append($(this).attr('name'), this.files[0]);
                    }
                });
            } else {
                // Get url vars
                urlVarsArray = Panda.Env.Url.getUrlVar(window.location.href);
                for (var urli in urlVarsArray) {
                    formData += urli + '=' + urlVarsArray[urli] + '&';
                }

                // Serialize form
                formData += jqForm.serialize();
            }

            // Disable all form elements that are not disabled already
            jqForm.find('input[name!=""]:not([disabled]),select[name!=""]:not([disabled]),textarea[name!=""]:not([disabled]),button:not([disabled])')
                .prop('disabled', true)
                .addClass('disabled')
                .addClass('panda-form-disabled');

            // Check if form is for upload
            var options = {};
            if (jqForm.attr('enctype') === 'multipart/form-data') {
                options.cache = false;
                options.contentType = false;
            }

            // Start HTMLResponse request
            var method = jqForm.attr('method') !== undefined ? jqForm.attr('method') : 'post';
            return Panda.Http.Jar.HTMLAsync.request(jqForm.attr('action'), method, formData, jqForm, true, null, options)
                .always(function () {
                    // Enable form elements, only the ones that were disabled before
                    jqForm.find('.panda-form-disabled')
                        .prop('disabled', false)
                        .removeClass('disabled')
                        .removeClass('panda-form-disabled');

                    // Set posting status false
                    jqForm.data('posting', false);
                });
        },

        /**
         * Reset the given form
         *
         * @param {object} jqForm
         * @param {boolean|int} full
         */
        reset: function (jqForm, full) {
            // Reset form (full or password-only)
            if (full === 1 || full === undefined) {
                jqForm.trigger('reset');
            } else {
                jqForm.find('input[type=password]').val('');
            }
        }
    });
})(jQuery);