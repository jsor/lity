/*! Lity - v3.0.0-dev - 2018-07-09
* http://sorgalla.com/lity/
* Copyright (c) 2015-2018 Jan Sorgalla; Licensed MIT */
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

    var _regex = /((maps|www)\.)?google\.([^\/\?]+)\/?((maps\/?)?\?)(.*)/i;

    lity.handlers('googlemaps', function(target, instance) {
        var matches = _regex.exec(target);

        if (!matches) {
            return false;
        }

        return lity.iframe(
            'https://www.google.' + matches[3] + '/maps?' + matches[6],
            instance,
            {
                output: matches[6].indexOf('layer=c') > 0 ? 'svembed' : 'embed'
            },
            target
        );
    });
}));
