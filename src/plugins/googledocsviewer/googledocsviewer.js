(function(window, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['lity'], function(lity) {
            factory(lity);
        });
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        factory(require('lity'));
    } else {
        factory(window.lity);
    }
}(typeof window !== "undefined" ? window : this, function(lity) {
    'use strict';

    var _regex = /(\S*)(\.(pdf|docx?|xlsx?|pptx?|e?ps|od(t|s|p)|pages|ai|psd|ttf)(\?\S*)?$)/i;

    lity.handlers('googledocsviewer', function(target, instance) {
        var matches = _regex.exec(target);

        if (!matches) {
            return false;
        }

        return lity.iframe(
            'https://docs.google.com/viewer?embedded=true&url=' + escape(matches[1]) + '.' + matches[3],
            instance,
            matches[5],
            target
        );
    });
}));
