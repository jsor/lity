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

If you want to open another URI than defined in the `href` attribute, just add
a `data-lity-target` with the URI:

```html
<a href="/image.html" data-lity data-lity-target="/image-preview.jpg">Image</a>
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

Events
------

* [lity:open](#lityopen)
* [lity:ready](#lityready)
* [lity:close](#lityclose)
* [lity:remove](#lityremove)
* [lity:resize](#lityresize)

### lity:open

Triggered before the lightbox is opened.

#### Example

```javascript
$(document).on('lity:open', function(event, lightbox, trigger) {
});
```

**Note**: The `trigger` argument might be undefined if the lightbox has been
opened progammatically and not by a click event handler.

### lity:ready

Triggered when the lightbox is ready.

#### Example

```javascript
$(document).on('lity:ready', function(event, lightbox, trigger) {
});
```

**Note**: The `trigger` argument might be undefined if the lightbox has been
opened progammatically and not by a click event handler.

### lity:close

Triggered before the lightbox is closed.

#### Example

```javascript
$(document).on('lity:close', function(event, lightbox) {
});
```

### lity:remove

Triggered when the closing animation is finished and the lightbox is removed
from the DOM.

#### Example

```javascript
$(document).on('lity:remove', function(event, lightbox) {
});
```

### lity:resize

Triggered when the lightbox is resized, usually when the user resizes the
window.

#### Example

```javascript
$(document).on('lity:resize', function(event, lightbox) {
});
```

License
-------

Copyright (c) 2015-2016 Jan Sorgalla.
Released under the [MIT](LICENSE?raw=1) license.
