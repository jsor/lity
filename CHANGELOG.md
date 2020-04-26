Changelog for 2.x
=================

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org).

2.4.1 - 2020-04-26
------------------

  * Compatibility with jQuery 3.5.0 (#240).

2.4.0 - 2019-08-10
------------------

  * Allow 'autoplay' on YouTube  (#222).

2.3.1 - 2018-04-20
------------------

  * Fix dist files not compiled correctly for 2.3.0 release.

2.3.0 - 2017-07-17
------------------

  * Add `esc` option. Setting this option to `false` prevents the lightbox from
    being closed when pressing the ESC key.

2.2.2 - 2016-12-14
------------------

  * Fix `focus()` not always available on active element, eg. for SVG elements
    in IE11 (#86).

2.2.1 - 2016-11-21
------------------

  * Fix focus not returned correctly when active element is the lightbox root
    element.

2.2.0 - 2016-10-08
------------------

  * Add support for Facebook Video URL's (#63, thanks @iamandrewluca).
  * Fix compatibility with Zepto and note requirement of the data module.

2.1.1 - 2016-09-19
------------------

  * Correctly transfer hashes for generated YouTube, Vimeo and Google Maps
    URLs. For example when linking to a specific video start time, eg.
    https://vimeo.com/1084537#t=1m15s.

2.1.0 - 2016-09-19
------------------

  * Images in ligtboxes now have an `alt` attribute set. The content is
    configurable through the `data-lity-desc` attribute on the opener element.
  * Initial focus is now set on the dialog element, not on the first focusable
    element inside the content. This prevents inline content scrolled down if
    the first focusable element is at the bottom of the content.
  * The global click event is now namespaced as `click.lity` for easier
    unbinding.

2.0.0 - 2016-09-09
------------------

New major release. See the [upgrade guide](UPGRADE-2.0.md) for detailed
information about upgrading from 1.x.

  * Lity is now fully accessible complying with the [Web Content Accessibility
    Guidelines (WCAG) 2.0](https://www.w3.org/TR/WCAG20/).
  * The `lity` function is now used directly to open a lightbox. There is no
    longer a function returned but a `Lity` instance.
  * All custom events triggered by Lity receive now one parameter: a `Lity`
    instance.
  * There are now dedicated youtube, vimeo and googlemaps handlers extracted
    from the iframe handler.

---

Older versions
--------------

  * The changelog for Lity 1.x can be found [here](https://github.com/jsor/lity/blob/1.x/CHANGELOG.md).
