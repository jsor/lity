Lity
====

Lity is a ultra-lightweight and responsive lightbox plugin which supports
images, iframes and inline content out of the box.

Minified and gzipped, its total footprint weights about 2kB.

It works with [jQuery](http://jquery.com) and [Zepto](http://zeptojs.com).

Installation
------------

All ready-to-use files are located in the [`dist/`](dist/) directory.

Include the Lity javascript and css files and its dependencies in your HTML
document:

```html
<link href="dist/lity.css" rel="stylesheet">
<script src="vendor/jquery.js"></script>
<script src="dist/lity.js"></script>
```

Lity can also be installed via Bower or [npm](https://www.npmjs.com/package/lity).

Usage
-----

### Declarative

Add the `data-lity` attribute to `<a>` elements for which you want the links to
be opened in a lightbox:

```html
<a href="https://farm9.staticflickr.com/8642/16455005578_0fdfc6c3da_b.jpg" data-lity>Image</a>
<a href="#inline" data-lity>Inline</a>
<a href="//www.youtube.com/watch?v=XSGBVzeBUbk" data-lity>iFrame Youtube</a>
<a href="//vimeo.com/1084537" data-lity>iFrame Vimeo</a>
<a href="//maps.google.com/maps?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA" data-lity>Google Maps</a>

<div id="inline" style="background:#fff" class="lity-hide">
    Inline content
</div>
```

### Programmatic

First create a lity instance:

```javascript
var lightbox = lity();
```

`lightbox` is now a function which can be either used directly to open links in
a lightbox or as an event handler:

```javascript
// Open a URL in a lightbox
lightbox('//www.youtube.com/watch?v=XSGBVzeBUbk');

// Bind as an event handler
$(document).on('click', '[data-lightbox]', lightbox);
```

If you want to close the currently opened lightbox, use `lightbox.close()`.

License
-------

Copyright (c) 2015 Jan Sorgalla.
Released under the [MIT](LICENSE?raw=1) license.
