(function () {
    "use strict";

    define("jquery", function () {
        return jQuery;
    });

    require.config({
        'paths': {
            'tinymce':  '../bower_components/tinymce-dist/tinymce.min',
            'tinymce.jquery': '../bower_components/tinymce-dist/jquery.tinymce.min',
            'tinymce.helper':  '../tinymce.helper'
        },
        'shim': {
            'tinymce': {
                exports: 'tinymce'
            },
            'tinymce.jquery': ['jquery', 'tinymce']
        }
    });

    require(['tinymce.helper'], function (helper) {
        test("helper.getConfig()", function() {
            console.log(helper.getConfig("advanced"));
            deepEqual(helper.getConfig("simple"), helper.getConfig("simple"), "helper.getConfig('simple') == helper.getConfig('simple')");
            notStrictEqual(helper.getConfig("simple"), helper.getConfig("simple"), "helper.getConfig() returns copy of object");
            deepEqual(helper.getConfig("advanced"), helper.getConfig("advanced"), "helper.getConfig('advanced') == helper.getConfig('advanced')");
            notStrictEqual(helper.getConfig("advanced"), helper.getConfig("advanced"), "helper.getConfig() returns copy of object");
            notDeepEqual(helper.getConfig("simple"), helper.getConfig("advanced"), "helper.getConfig('simple') != helper.getConfig('advanced')");
            notDeepEqual(helper.getConfig("simple"), {}, "helper.getConfig('simple') != {}");
            notDeepEqual(helper.getConfig("advanced"), {}, "helper.getConfig('advanced') != {}");
        });

        var textarea = $('<textarea id="tinymce1" />').add($('<textarea id="tinymce2" />')).val("<p>Lorem Ipsum</p>");

        textarea.appendTo($("body"));
        helper.initEditor(textarea, $.extend(helper.getConfig("simple"), {
            setup : function(ed) {
                ed.on('init', function() {
                    //console.log(tinymce.editors);
                    //console.log(tinymce.EditorManager.get("tinymce1"));
                    test("init editor #" + ed.id, function () {
                        ok(ed.getContent() == "<p>Lorem Ipsum</p>", "editor content is: " + ed.getContent());
                    });
                });
            }
        }));
    });
}());
