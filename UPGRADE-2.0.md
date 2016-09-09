Upgrade from 1.x to 2.0
=======================

If you have only used the declarative way of using Lity, everything should work
as before. The only major breaking change happened for the programmatic setup
of lightboxes and the event handler signatures.

The `lity` function
-------------------

The `lity` function no longer returns a function but is used directly to open
URLs (or HTML) in a lightbox.

### Old (1.x)

```javascript
var lightbox = lity(options);
lightbox('//www.youtube.com/watch?v=XSGBVzeBUbk');
```

### New (2.x)

```javascript
lity('//www.youtube.com/watch?v=XSGBVzeBUbk', options);
```

Events
------

Event handlers bound to Lity's custom events receive now only one additional
parameter: a `Lity` instance.

### Old (1.x)

```javascript
$(document).on('lity:open', function(event, lightbox, trigger) {
    lightbox.close();
});
```

### New (2.x)

```javascript
$(document).on('lity:open', function(event, instance) {
    instance.close();
    
    var trigger = instance.opener();
});
```

Handlers
--------

If you configured links for the specific iframe handler, be aware that YouTube,
Vimeo and Google Maps URLs are now handled by their dedicated handlers.

### Old (1.x)

```html
<a href="http://www.youtube.com/watch?v=XSGBVzeBUbk" data-lity="{&quot;handler&quot;: &quot;iframe&quot;}">Video</a>
```

### New (2.x)

```html
<a href="http://www.youtube.com/watch?v=XSGBVzeBUbk" data-lity="{&quot;handler&quot;: &quot;youtube&quot;}">Video</a>
```
