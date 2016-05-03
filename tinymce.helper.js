(function () {
    "use strict";

    var configuration = {},
        alignSelectors = "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li,table,img";

    /**
     * @param {Object} obj
     * @return {Object}
     */
    function addAlignClasses (obj) {
        obj.alignleft = {
            selector: alignSelectors,
            classes: "text-xs-left"
        };

        obj.aligncenter = {
            selector: alignSelectors,
            classes: "text-xs-center"
        };

        obj.alignright = {
            selector: alignSelectors,
            classes: "text-xs-right"
        };

        obj.alignfull = {
            selector: alignSelectors,
            classes: "text-justify"
        };

        return obj;
    }

    /**
     * @param {Object} obj
     * @returns {Object}
     */
    function addUnderline (obj) {
        obj.underline = {inline : 'u'};
        return obj;
    }

    /**
     * @param {Object} obj
     * @returns {Object}
     */
    function addStrike (obj) {
        obj.strikethrough = {inline : 'del'};
        return obj;
    }

    Object.defineProperties(configuration, {
        "simple": {
            value: {
                "formats": addStrike(addUnderline(addAlignClasses({})))
            }
        },
        "advanced": {
            value: {
                "resize": true,
                "plugins": [
                    "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars code codemirror fullscreen",
                    "insertdatetime media nonbreaking save table contextmenu directionality",
                    "template paste textcolor"
                ],
                "toolbar1": "preview | undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent",
                "toolbar2": "anchor link image media | fontsizeselect | forecolor backcolor | code | template",
                "image_advtab": true,
                "fontsize_formats": "0.5rem 0.6rem 0.7rem 0.8rem 0.9rem 1rem 1.1rem 1.2rem 1.3rem 1.4rem 1.5rem 1.6rem 1.7rem 1.8rem 1.9rem 2rem 2.2rem 2.4rem 2.6rem 2.8rem 3rem",
                "formats": addStrike(addUnderline(addAlignClasses({}))),
                "templates": [
                    {
                        "title":"-----------------------------------------",
                        "description": "http:\/\/getbootstrap.com\/","content":""
                    },
                    {
                        "title": "Addresses",
                        "description": "http:\/\/getbootstrap.com\/css\/#type-addresses",
                        "content": "<address><strong>Twitter, Inc.<\/strong><br \/>795 Folsom Ave, Suite 600<br \/>San Francisco, CA 94107<br \/><abbr title=Phone>P:<\/abbr> (123) 456-7890<\/address><address><strong>Full Name<\/strong><br \/><a href=mailto:#>first.last@example.com<\/a><\/address>"
                    },
                    {
                        "title": "Table",
                        "description": "http:\/\/getbootstrap.com\/css\/#tables",
                        "content": "<table class=table><thead><tr><th>#<\/th><th>First Name<\/th><th>Last Name<\/th><th>Username<\/th><\/tr><\/thead><tbody><tr><td>1<\/td><td>Mark<\/td><td>Otto<\/td><td>@mdo<\/td><\/tr><tr><td>2<\/td><td>Jacob<\/td><td>Thornton<\/td><td>@fat<\/td><\/tr><tr><td>3<\/td><td colspan=2>Larry the Bird<\/td><td>@twitter<\/td><\/tr><\/tbody><\/table>"
                    },
                    {
                        "title": "Floating",
                        "description": "http:\/\/getbootstrap.com\/css\/#helper-classes",
                        "content": "<div class=clearfix><div class=pull-xs-left>Float Left<\/div><div class=pull-xs-right>Float Right<\/div><\/div>"
                    },
                    {
                        "title": "Simple Grid",
                        "description": "http:\/\/getbootstrap.com\/css\/#grid",
                        "content": "<div class=container><div class=row><div class=col-xs-4>.col-xs-4<\/div><div class=col-xs-4>.col-xs-4<\/div><div class=col-xs-4>.col-xs-4<\/div><\/div><\/div>"
                    }
                ]
            }
        }
    });

    define('tinymce.helper', ['jquery', 'tinymce.jquery'], function ($) {
        return {
            /**
             * @param {String} name
             * @returns {Object}
             */
            getConfig: function (name) {
                if (typeof configuration[name] === 'undefined') {
                    throw new Error('Not found config by name "' + name + '"');
                }

                return $.extend(true, {}, configuration[name]);
            },
            /**
             * @param {jQuery} selector
             * @param {Object} config
             */
            initEditor: function (selector, config) {
                selector.tinymce(config);
            },
            addAlignClasses: addAlignClasses,
            addUnderline: addUnderline,
            addStrike: addStrike
        };
    });
}());
