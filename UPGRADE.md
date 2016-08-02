Upgrade from 1.x to 2.x
=======================

If you have only used the declarative way of using Lity, everything should work
as before. The only major breaking change happened for the programmatic setup
of lightboxes.

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
