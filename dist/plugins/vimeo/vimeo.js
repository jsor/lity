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

    var _regex = /(vimeo(pro)?\.com)\/(?:[^\d]+)?(\d+)\??(.*)?$/;

    lity.handlers('vimeo', function(target, instance) {
        var matches = _regex.exec(target);

        if (!matches) {
            return false;
        }

        return lity.iframe(
            'https://player.vimeo.com/video/' + matches[3] + '?autoplay=1',
            instance,
            matches[4],
            target
        );
    });
}));
