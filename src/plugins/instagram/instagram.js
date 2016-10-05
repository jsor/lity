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

    var _regex = /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?\??(.*)?/i;

    lity.handlers('instagram', function(target, instance) {
        var matches = _regex.exec(target);

        if (!matches) {
            return false;
        }

        return lity.iframe(
            'https://www.instagram.com/p/' + matches[2] + '/embed/',
            instance,
            matches[3],
            target
        );
    });
}));
