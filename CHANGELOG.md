Changelog for 2.x
=================

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org).

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
