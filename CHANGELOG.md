Changelog for 2.x
=================

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org).

2.0.0 - xxxx-xx-xx
------------------

New major release. See [Upgrade](Upgrade.md) for detailed information about 
upgrading from 1.x.

  * The `lity` function is now used directly to open a lightbox. There is no
    longer a function returned but a `Lity` instance.
  * All custom events triggered by Lity receive now one parameter: a `Lity`
    instance.
  * There are now dedicated youtube, vimeo and googlemaps handlers extracted
    from the iframe handler.
