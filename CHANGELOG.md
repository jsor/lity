Changelog
=========

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org).

1.5.2 - 2015-12-27
------------------

* Added: {cursor: pointer}  to all tags with attribute `data-lity`

1.5.1 - 2015-12-02
------------------

* Fixed: Better window instance detection, falls back to `this` if undefined
* Fixed: Fix wrong argument when calling configured handler

1.5.0 - 2015-09-22
------------------

* Added: Add support for .svg to the image handler (thanks @creynders)
* Added: Add support for .webp, .ico and .tif to the image handler

1.4.2 - 2015-09-03
------------------

* Fixed: YouTube/Vimeo URL parameters like `autoplay` are now passed correctly
  to the embed URLS.

1.4.1 - 2015-08-18
------------------

* Fixed: Ensure options set with lity.options() and instance.options() are used
  correctly.
* Fixed: Ensure handlers set with lity.handlers() and instance.handlers() are
  used correctly.

1.4.0 - 2015-07-30
------------------

* Added: Improved support of Vimeo URLs.
* Added: Improved youtube-nocookie.com URL detection.
* Added: Toggle global `lity-active` class on `<html>` element.
* Added: Made html template configurable.
* Added: Scale transitions for open and close animations.
* Added: Trigger `lity:remove` event just before removing from the DOM.

1.3.0 - 2015-07-01
------------------

* Added: More robust support of YouTube URLs.
* Added: More robust support of Google Maps URLs.
* Fixed: Optimized close button styles (makes styling more robust for :hover,
  :focus, :active and :visited states).

1.2.0 - 2015-05-15
------------------

* Changed: The iFrame handler is now the latest handler in the auto-detection
  chain and can now handle all types of URLs.

1.1.2 - 2015-04-23
------------------

* Fixed: Fixed runtime options not set if main popup handler isn't called

1.1.1 - 2015-04-02
------------------

* Fixed: Removed jQuery specific .end() for Zepto compatibility

1.1.0 - 2015-04-02
------------------

* Changed: Removed dependency on ES5 shim

1.0.0 - 2015-03-31
------------------

* First stable release
