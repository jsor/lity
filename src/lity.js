(function(window, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(window);
    } else {
        window.lity = factory(window);
    }
}(typeof window !== "undefined" ? window : this, function(window) {
    'use strict';

    var document = window.document;

    var _win = window;
    var _deferred = function() {
        var self = this;
        self.promise = new Promise((resolve, reject) => {
            self.resolve = resolve;
            self.reject = reject;
        });
    };
    var _html = document.documentElement;
    var _instances = [];

    var _attrAriaHidden = 'aria-hidden';
    var _dataAriaHidden = 'lity-' + _attrAriaHidden;

    var _focusableElementsSelector = 'a[href],area[href],input:not([disabled]),select:not([disabled]),textarea:not([disabled]),button:not([disabled]),iframe,object,embed,[contenteditable],[tabindex]:not([tabindex^="-"])';

    var _defaultOptions = {
        esc: true,
        handler: null,
        handlers: {
            image: imageHandler,
            inline: inlineHandler,
            iframe: iframeHandler
        },
        template: '<div class="lity" role="dialog" aria-label="Dialog Window (Press escape to close)" tabindex="-1"><div class="lity-wrap" data-lity-close role="document"><div class="lity-loader" aria-hidden="true">Loading...</div><div class="lity-container"><div class="lity-content"></div><button class="lity-close" type="button" aria-label="Close (Press escape to close)" data-lity-close>&times;</button></div></div></div>'
    };

    var _imageRegexp = /(^data:image\/)|(\.(png|jpe?g|gif|svg|webp|avif|bmp|ico)(\?\S*)?$)/i;

    function transitionEnd(elements) {
        var deferred = new _deferred();

        if (!elements.length) {
            deferred.resolve();
        } else {
            $each(elements, function(i, el) {
                if (typeof el === "object") {
                    el.addEventListener('transitionend', deferred.resolve, { once: true });
                }
            });
        }

        return deferred.promise;
    }

    function extend(out) {
        out = out || {};

        for (var i = 1; i < arguments.length; i++) {
          if (!arguments[i])
            continue;
      
          for (var key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key))
              out[key] = arguments[i][key];
          }
        }

        return out;
    };

    function $each( obj, callback, args ) {
        // Adapted from $.each()
        var value, i = 0;

        if ( args ) {
            for ( i in obj ) {
                value = callback.apply( obj[ i ], args );

                if ( value === false ) {
                    break;
                }
            }

            // A special, fast, case for the most common use of each
        } else {
            for ( i in obj ) {
                value = callback.call( obj[ i ], i, obj[ i ] );

                if ( value === false ) {
                    break;
                }
            }
        }

        return obj;
    };

    function trigger(elm, ev, data) {
        var event = new CustomEvent(ev, {detail: data[0]});

        elm.dispatchEvent(event);
    }

    function settings(currSettings, key, value) {
        if (arguments.length === 1) {
            return extend({}, currSettings);
        }

        if (typeof key === 'string') {
            if (typeof value === 'undefined') {
                return typeof currSettings[key] === 'undefined'
                    ? null
                    : currSettings[key];
            }

            currSettings[key] = value;
        } else {
            extend(currSettings, key);
        }

        return this;
    }

    function parseQueryParams(params) {
        var pos = params.indexOf('?');

        if (pos > -1) {
            params = params.substr(pos + 1);
        }

        var pairs = decodeURI(params.split('#')[0]).split('&');
        var obj = {}, p;

        for (var i = 0, n = pairs.length; i < n; i++) {
            if (!pairs[i]) {
                continue;
            }

            p = pairs[i].split('=');
            obj[p[0]] = p[1];
        }

        return obj;
    }

    function appendQueryParams(url, params) {
        if (!params) {
            return url;
        }

        if (typeof 'string' === params) {
            params = parseQueryParams(params);
        }

        if (url.indexOf('?') > -1) {
            var split = url.split('?');
            url = split.shift();

            params = extend(
                {},
                parseQueryParams(split[0]),
                params
            )
        }

        return url + '?' + new URLSearchParams(Object.entries(params)).toString();
    }

    function transferHash(originalUrl, newUrl) {
        var pos = originalUrl.indexOf('#');

        if (-1 === pos) {
            return newUrl;
        }

        if (pos > 0) {
            originalUrl = originalUrl.substr(pos);
        }

        return newUrl + originalUrl;
    }

    function iframe(iframeUrl, instance, queryParams, hashUrl) {
        instance && instance.element().classList.add('lity-iframe');

        if (queryParams) {
            iframeUrl = appendQueryParams(iframeUrl, queryParams);
        }

        if (hashUrl) {
            iframeUrl = transferHash(hashUrl, iframeUrl);
        }

        return '<div class="lity-iframe-container"><iframe frameborder="0" allow="autoplay; fullscreen" src="' + iframeUrl + '"/></div>';
    }

    function error(msg) {
        var el = document.createElement('span');
        el.classList.add('lity-error');

        return el.appendChild(msg);
    }

    function imageHandler(target, instance) {
        var desc = (instance.opener() && instance.opener().dataset.lityDesc) || 'Image with no description';
        var img = document.createElement('img');
        img.setAttribute('src', target);
        img.setAttribute('alt', desc);
        var deferred = new _deferred();
        var failed = function() {
            deferred.reject(error('Failed loading image'));
        };

        img.onload = function() {
            if (this.naturalWidth === 0) {
                return failed();
            }

            deferred.resolve(img);
        };
        img.onerror = failed;

        return deferred.promise;
    }

    imageHandler.test = function(target) {
        return _imageRegexp.test(target);
    };

    function inlineHandler(target, instance) {
        var el, placeholder, hasHideClass;

        try {
            el = document.querySelector(target);
        } catch (e) {
            return false;
        }
        
        if (!el) {
            return false;
        }
        
        placeholder = document.createElement('i');
        placeholder.style.display = 'none !important';
        hasHideClass = el.classList.contains('lity-hide');

        instance
            .element()
            .addEventListener('lity:remove', function() {
                placeholder.insertAdjacentElement('beforebegin', el);
                if (placeholder.parentNode !== null) {
                    placeholder.parentNode.removeChild(placeholder);
                }

                if (hasHideClass && !el.closest('.lity-content').length) {
                    el.classList.add('lity-hide');
                }
            }, { once: true })
        ;

        el.classList.remove('lity-hide');
        el.insertAdjacentElement('afterend', placeholder);

        return el;
    }

    function iframeHandler(target, instance) {
        return iframe(target, instance);
    }

    function winHeight() {
        return document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : Math.round(_win.innerHeight);
    }

    function keydown(e) {
        var current = currentInstance();

        if (!current) {
            return;
        }

        // ESC key
        if (e.keyCode === 27 && !!current.options('esc')) {
            current.close();
        }

        // TAB key
        if (e.keyCode === 9) {
            handleTabKey(e, current);
        }
    }

    function handleTabKey(e, instance) {
        var focusableElements = instance.element().querySelectorAll(_focusableElementsSelector);

        function index(item, collection) {
            return [].slice.call(collection).indexOf(item);
        }
          
        var focusedIndex = index(document.activeElement, focusableElements);

        if (e.shiftKey && focusedIndex <= 0) {
            focusableElements[focusableElements.length - 1].focus();
            e.preventDefault();
        } else if (!e.shiftKey && focusedIndex === focusableElements.length - 1) {
            focusableElements[0].focus();
            e.preventDefault();
        }
    }

    function resize() {
        _instances.forEach(function(instance, i) {
            instance.resize();
        });
    }

    function registerInstance(instanceToRegister) {
        if (1 === _instances.unshift(instanceToRegister)) {
            _html.classList.add('lity-active');

            _win.addEventListener('resize', resize, false);
            _win.addEventListener('keydown', keydown, false);
        }

        var filteredElms = document.querySelectorAll('body > *');
        filteredElms.forEach(el => {
            if (el == instanceToRegister.element()) {
                return;
            }

            el.classList.add('lity-hidden');

            if (undefined !== el.dataset[_dataAriaHidden]) {
                return;
            }

            if (el && el.getAttribute(_attrAriaHidden)) {
                el.setAttribute(_dataAriaHidden, el.getAttribute(_attrAriaHidden) || null);
            }

            el.setAttribute(_attrAriaHidden, 'true');
        });
    }

    function removeInstance(instanceToRemove) {
        var show;

        instanceToRemove
            .element()
            .setAttribute(_attrAriaHidden, 'true')
        ;

        if (1 === _instances.length) {
            _html.classList.remove('lity-active');

            _win.removeEventListener('resize', resize, false);
            _win.removeEventListener('keydown', keydown, false);
        }

        _instances = _instances.filter(instance => instanceToRemove !== instance);

        if (!!_instances.length) {
            show = _instances[0].element();
        } else {
            show = document.querySelectorAll('.lity-hidden');
        }

        show.forEach(el => {
            var oldAttr = el.dataset[_dataAriaHidden];

            el.classList.remove('lity-hidden');

            if (!oldAttr) {
                el.removeAttribute(_attrAriaHidden);
            } else {
                el.setAttribute(_attrAriaHidden, oldAttr);
            }

            delete el.dataset[_dataAriaHidden];
        });
    }

    function currentInstance() {
        if (0 === _instances.length) {
            return null;
        }

        return _instances[0];
    }

    function factory(target, instance, handlers, preferredHandler) {
        var handler = 'inline', content;

        var currentHandlers = extend({}, handlers);

        if (preferredHandler && currentHandlers[preferredHandler]) {
            content = currentHandlers[preferredHandler](target, instance);
            handler = preferredHandler;
        } else {
            // Run inline and iframe handlers after all other handlers
            ['inline', 'iframe'].forEach(function(name, i){
                delete currentHandlers[name];

                currentHandlers[name] = handlers[name];
            });

            $each(currentHandlers, function(name, currentHandler) {
                // Handler might be "removed" by setting callback to null
                if (!currentHandler) {
                    return true;
                }

                if (
                    currentHandler.test &&
                    !currentHandler.test(target, instance)
                ) {
                    return true;
                }

                content = currentHandler(target, instance);

                if (false !== content) {
                    handler = name;
                    return false;
                }
            });
        }

        return {handler: handler, content: content || ''};
    }

    function Lity(target, options, opener, activeElement) {
        var self = this;
        var result;
        var isReady = false;
        var isClosed = false;
        var element;
        var content;

        options = extend(
            {},
            _defaultOptions,
            options
        );

        element = new DOMParser().parseFromString(options.template, 'text/html').body.childNodes[0];

        // -- API --

        self.element = function() {
            return element;
        };

        self.opener = function() {
            return opener;
        };

        self.content = function() {
            return content;
        };

        self.options  = settings.bind(self, options);
        self.handlers = settings.bind(self, options.handlers);

        self.resize = function() {
            if (!isReady || isClosed) {
                return;
            }

            content.style.maxHeight = winHeight() + 'px';
            trigger(content, 'lity:resize', [self]);
        };

        self.close = function() {
            if (!isReady || isClosed) {
                return;
            }

            isClosed = true;

            removeInstance(self);

            var deferred = new _deferred();

            // We return focus only if the current focus is inside this instance
            if (
                activeElement && 
                (
                    document.activeElement === element ||
                    element !== document.activeElement && element.contains(document.activeElement)
                )
            ) {
                activeElement.focus();
            }

            trigger(content, 'lity:close', [self]);

            element.classList.remove('lity-opened');
            element.classList.add('lity-closed');

            transitionEnd([content].concat(element))
                .then(function() {
                    trigger(content, 'lity:remove', [self]);
                    element.remove();
                    element = undefined;
                    deferred.resolve();
                })
            ;

            return deferred.promise;
        };

        // -- Initialization --

        result = factory(target, self, options.handlers, options.handler);

        element.setAttribute(_attrAriaHidden, 'false');
        element.classList.add('lity-loading', 'lity-opened', 'lity-' + result.handler);
        document.body.appendChild(element);
        element.focus();
        element.addEventListener('click', function(e) {
            // loop parent nodes from the target to the delegation node
            for (var target = e.target; target && target != this; target = target.parentNode) {
                if (target.matches('[data-lity-close]')) {
                    self.close();
                    break;
                }
            }
        }, false);

        trigger(element, 'lity:open', [self]);

        registerInstance(self);

        Promise.all([result.content]).then((results) => results.forEach(result => {
            ready(result)
        }));
        
        function ready(result) {
            if (result) {
                if (typeof result !== "string") {
                    if (result.length) {
                        var html = Array.prototype.reduce.call(result, function(html, node) {
                            return html + ( node.outerHTML || node.nodeValue );
                        }, "");
                        content = new DOMParser().parseFromString(html, 'text/html').body.childNodes[0];
                    } else {
                        content = result;
                    }
                } else {
                    content = new DOMParser().parseFromString(result, 'text/html').body.childNodes[0];
                }
            }
            
            $each(element.querySelectorAll('.lity-loader'), function() {
                var loader = this;
                
                transitionEnd([loader])
                    .then(function() {
                        if (loader.parentNode) {
                            loader.parentNode.removeChild(loader);
                        }
                    })
                ;
            });

            element.classList.remove('lity-loading');

            var el = element.querySelector('.lity-content');

            while(el.firstChild)
                el.removeChild(el.firstChild);

            el.appendChild(content);

            isReady = true;

            trigger(content, 'lity:ready', [self]);
        }
    }

    function lity(target, options, opener) {
        if (!target.preventDefault) {
            opener = document.querySelector(opener);
        } else {
            target.preventDefault();
            opener = this;
            target = opener.dataset.lityTarget || opener.getAttribute('href') || opener.getAttribute('src');
        }

        var instance = new Lity(
            target,
            extend(
                {},
                opener ? opener.dataset.lityOptions || opener.dataset.lity : null,
                options
            ),
            opener,
            document.activeElement
        );

        if (!target.preventDefault) {
            return instance;
        }
    }

    lity.version  = '@VERSION';
    lity.options  = settings.bind(lity, _defaultOptions);
    lity.handlers = settings.bind(lity, _defaultOptions.handlers);

    lity.current  = currentInstance;
    lity.iframe   = iframe;

    document.addEventListener('click', function(e) {
        // loop parent nodes from the target to the delegation node
        for (var target = e.target; target && target != this; target = target.parentNode) {
            if (target.matches('[data-lity]')) {
                lity.call(target, e);
                break;
            }
        }
    }, false);

    return lity;
}));
