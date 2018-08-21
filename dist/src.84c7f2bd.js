// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"scripts/temp.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

// addText = function(){
//   document.getElementById('caption').innerText = 'The Sweetness of Parcel and Stylus'
// }
var addText = exports.addText = function addText() {
  document.getElementById('caption').innerText = 'The Sweet Taste of Parcel and Stylus';
};
},{}],"scripts/smoothscroll.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* Smooth scrolling
   Changes links that link to other parts of this page to scroll
   smoothly to those links rather than jump to them directly, which
   can be a little disorienting.

   sil, http://www.kryogenix.org/

   v1.0 2003-11-11
   v1.1 2005-06-16 wrap it up in an object
*/
var smoothscroll = exports.smoothscroll = function smoothscroll() {
  var ss = {
    fixAllLinks: function fixAllLinks() {
      // Get a list of all links in the page
      var allLinks = document.getElementsByTagName('a');
      // Walk through the list
      for (var i = 0; i < allLinks.length; i++) {
        var lnk = allLinks[i];
        if (lnk.href && lnk.href.indexOf('#') != -1 && (lnk.pathname == location.pathname || '/' + lnk.pathname == location.pathname) && lnk.search == location.search) {
          // If the link is internal to the page (begins in #)
          // then attach the smoothScroll function as an onclick
          // event handler
          ss.addEvent(lnk, 'click', ss.smoothScroll);
        }
      }
    },

    smoothScroll: function smoothScroll(e) {
      // This is an event handler; get the clicked on element,
      // in a cross-browser fashion
      if (window.event) {
        target = window.event.srcElement;
      } else if (e) {
        target = e.target;
      } else return;

      // Make sure that the target is an element, not a text node
      // within an element
      if (target.nodeName.toLowerCase() != 'a') {
        target = target.parentNode;
      }

      // Paranoia; check this is an A tag
      if (target.nodeName.toLowerCase() != 'a') return;

      // Find the <a name> tag corresponding to this href
      // First strip off the hash (first character)
      anchor = target.hash.substr(1);
      // Now loop all A tags until we find one with that name
      var allLinks = document.getElementsByTagName('a');
      var destinationLink = null;
      for (var i = 0; i < allLinks.length; i++) {
        var lnk = allLinks[i];
        if (lnk.name && lnk.name == anchor) {
          destinationLink = lnk;
          break;
        }
      }
      if (!destinationLink) destinationLink = document.getElementById(anchor);

      // If we didn't find a destination, give up and let the browser do
      // its thing
      if (!destinationLink) return true;

      // Find the destination's position
      var destx = destinationLink.offsetLeft;
      var desty = destinationLink.offsetTop;
      var thisNode = destinationLink;
      while (thisNode.offsetParent && thisNode.offsetParent != document.body) {
        thisNode = thisNode.offsetParent;
        destx += thisNode.offsetLeft;
        desty += thisNode.offsetTop;
      }

      // Stop any current scrolling
      clearInterval(ss.INTERVAL);

      cypos = ss.getCurrentYPos();

      ss_stepsize = parseInt((desty - cypos) / ss.STEPS);
      ss.INTERVAL = setInterval('ss.scrollWindow(' + ss_stepsize + ',' + desty + ',"' + anchor + '")', 10);

      // And stop the actual click happening
      if (window.event) {
        window.event.cancelBubble = true;
        window.event.returnValue = false;
      }
      if (e && e.preventDefault && e.stopPropagation) {
        e.preventDefault();
        e.stopPropagation();
      }
    },

    scrollWindow: function scrollWindow(scramount, dest, anchor) {
      wascypos = ss.getCurrentYPos();
      isAbove = wascypos < dest;
      window.scrollTo(0, wascypos + scramount);
      iscypos = ss.getCurrentYPos();
      isAboveNow = iscypos < dest;
      if (isAbove != isAboveNow || wascypos == iscypos) {
        // if we've just scrolled past the destination, or
        // we haven't moved from the last scroll (i.e., we're at the
        // bottom of the page) then scroll exactly to the link
        window.scrollTo(0, dest);
        // cancel the repeating timer
        clearInterval(ss.INTERVAL);
        // and jump to the link directly so the URL's right
        location.hash = anchor;
      }
    },

    getCurrentYPos: function getCurrentYPos() {
      if (document.body && document.body.scrollTop) return document.body.scrollTop;
      if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
      if (window.pageYOffset) return window.pageYOffset;
      return 0;
    },

    addEvent: function addEvent(elm, evType, fn, useCapture) {
      // addEvent and removeEvent
      // cross-browser event handling for IE5+,  NS6 and Mozilla
      // By Scott Andrew
      if (elm.addEventListener) {
        elm.addEventListener(evType, fn, useCapture);
        return true;
      } else if (elm.attachEvent) {
        var r = elm.attachEvent("on" + evType, fn);
        return r;
      } else {
        alert("Handler could not be removed");
      }
    }
  };

  ss.STEPS = 25;

  ss.addEvent(window, "load", ss.fixAllLinks);
};
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;
function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);
    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    link.remove();
  };
  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"index.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
'use strict';

var _temp = require('./scripts/temp.js');

var _smoothscroll = require('./scripts/smoothscroll.js');

// require('./scripts/smoothscroll.js')
// require('./scripts/temp.js')
require('./index.css');

(0, _temp.addText)();
(0, _smoothscroll.smoothscroll)();
},{"./scripts/temp.js":"scripts/temp.js","./scripts/smoothscroll.js":"scripts/smoothscroll.js","./index.css":"index.css"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';

var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };

  module.bundle.hotData = null;
}

module.bundle.Module = Module;

var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = '' || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '34937' + '/');
  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();

      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');

      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);

      removeErrorOverlay();

      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;

  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';

  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.84c7f2bd.map