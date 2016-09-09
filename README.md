Lity
====

Lity is a ultra-lightweight, accessible and responsive lightbox plugin which
supports images, iframes and inline content out of the box.

Minified and gzipped, its total footprint weights about 3kB.

It works with [jQuery](https://jquery.com) and [Zepto](http://zeptojs.com)
(requires the [callbacks](https://github.com/madrobby/zepto/blob/master/src/callbacks.js)
and [deferred](https://github.com/madrobby/zepto/blob/master/src/deferred.js)
modules).

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
<a href="https://www.youtube.com/watch?v=XSGBVzeBUbk" data-lity>iFrame Youtube</a>
<a href="https://vimeo.com/1084537" data-lity>iFrame Vimeo</a>
<a href="https://maps.google.com/maps?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA" data-lity>Google Maps</a>

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

The `lity` function can be either used directly to open URLs (or HTML) in a
lightbox or as an event handler.

```
Lity lity(string target, [Object options, [, HTMLElement|$ opener]])
```

#### Arguments

* `target`: The URL or HTML to open.
* `options`: Options as an object of key-value pairs.
* `opener`: The element which triggered opening the lightbox (if used as a event
   handler, this is automatically set to the element which triggered the event).

#### Return value

A [`Lity`](#the-lity-instance) instance.

#### Example

```javascript
// Open a URL or HTML in a lightbox
lity('https://www.youtube.com/watch?v=XSGBVzeBUbk');
lity('<p>Some content to show...</p>');

// Bind as an event handler
$(document).on('click', '[data-my-lightbox]', lity);
```

The Lity instance
-----------------

If you open a lightbox programmatically, the `lity` function returns a `Lity`
instance you can use to interact with the lightbox.

The `Lity` instance is also passed as the second argument to the 
[event handlers](#events).

```javascript
var instance = lity('https://www.youtube.com/watch?v=XSGBVzeBUbk');
```

### API

* [Lity.close](#lityclose)
* [Lity.element](#lityelement)
* [Lity.opener](#lityopener)
* [Lity.options](#lityoptions)

#### Lity.close

Closes the lightbox and returns a promise which resolves once the closing
animation is finished.

```javascript
instance.close().then(function() {
    console.log('Lightbox closed');
});
```

#### Lity.element

Returns the root HTML element.

```javascript
var element = instance.element();
```

#### Lity.opener

Returns the HTML element which triggered opening the lightbox.

```javascript
var opener = instance.opener();
```

**Note**: The value might be undefined if the lightbox has been opened
programmatically and not by a click event handler and no opener argument was
provided.

#### Lity.options

Sets or returns options of the instance.

```javascript
var all = instance.options();
var template = instance.options('template');
instance.options('template', '<div>...</div>');
```

Events
------

All events receive the [`Lity`](#the-lity-instance) instance as the second
argument.

### Available events

* [lity:open](#lityopen)
* [lity:ready](#lityready)
* [lity:close](#lityclose)
* [lity:remove](#lityremove)
* [lity:resize](#lityresize)

#### lity:open

Triggered before the lightbox is opened.

```javascript
$(document).on('lity:open', function(event, instance) {
    console.log('Lightbox opened');
});
```

#### lity:ready

Triggered when the lightbox is ready.

```javascript
$(document).on('lity:ready', function(event, instance) {
    console.log('Lightbox ready');
});
```

#### lity:close

Triggered before the lightbox is closed.

```javascript
$(document).on('lity:close', function(event, instance) {
    console.log('Lightbox closed');
});
```

#### lity:remove

Triggered when the closing animation is finished and just before the lightbox
is removed from the DOM.

```javascript
$(document).on('lity:remove', function(event, instance) {
    console.log('Lightbox removed');
});
```

#### lity:resize

Triggered when the instance is resized, usually when the user resizes the
window.

```javascript
$(document).on('lity:resize', function(event, instance) {
    console.log('Lightbox resized');
});
```

License
-------

Copyright (c) 2015-2016 Jan Sorgalla.
Released under the [MIT](LICENSE?raw=1) license.
