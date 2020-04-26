/*! Lity - v3.0.0-dev - 2020-04-26
* http://sorgalla.com/lity/
* Copyright (c) 2015-2020 Jan Sorgalla; Licensed MIT */
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

    var _regex = /(facebook\.com)\/([a-z0-9_-]*)\/videos\/([0-9]*)(.*)?$/i;

    lity.handlers('facebookvideo', function(target, instance) {
        var matches = _regex.exec(target);

        if (!matches) {
            return false;
        }

        if (0 !== target.indexOf('http')) {
            target = 'https:' + target;
        }

        return lity.iframe(
            'https://www.facebook.com/plugins/video.php?href=' + target + '&autoplay=1',
            instance,
            matches[4],
            target
        );
    });
}));
