/*! Lity - v3.0.0-dev - 2017-11-28
* http://sorgalla.com/lity/
* Copyright (c) 2015-2017 Jan Sorgalla; Licensed MIT */
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

  var _regex = /(imgur\.com)(\/gallery)?\/([a-zA-Z0-9_\-]+)\/?\??(.*)?/i;

  lity.handlers('imgur', function(target, instance) {
      var matches = _regex.exec(target);

      if (!matches) {
          return false;
      }
      if (matches[2] === "/gallery"){
        var head = document.getElementsByTagName("head")[0];
        var s = document.createElement("script");
        s.src = "//s.imgur.com/min/embed.js";
        head.appendChild(s);
        return lity.handlers().inline(
          '<blockquote class="imgur-embed-pub" lang="en" data-id="a/' + matches[3] + 
          '"><a href="//imgur.com/' + matches[3] + '"></a></blockquote>',
          instance
        )
      }
      
      return lity.handlers().image('https://www.imgur.com/' + matches[3] + '.jpg', instance)
  });
}));