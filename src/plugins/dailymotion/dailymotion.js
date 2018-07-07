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

    var _regex = /dailymotion\.com(?:\/embed)?\/video\/([a-z0-9_-]*)\??(.*)?/i;

    lity.handlers('dailymotion', function(target, instance) {
        var matches = _regex.exec(target);

        if (!matches) {
            return false;
        }

        return lity.iframe(
            'https://www.dailymotion.com/embed/video/' + matches[1] + '?autoPlay=1',
            instance,
            matches[2],
            target
        );
    });
}));
