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
})({"scripts/navbar.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// toggle the nav using the burger
var navbar = exports.navbar = function navbar() {
    var menuIcon = document.getElementById('openMenu').addEventListener("click", function () {
        var nav = document.getElementById('nav');
        nav.classList.toggle('hide');
    });
    //close nav on clicking anywhere on the nav
    var closeNav = document.getElementById('navUl').addEventListener('click', function () {
        var nav = document.getElementById('nav');
        nav.classList.add('hide');
    });
    // change navbar when scrolling begins
    var navWrap = document.getElementById('navWrap');
    var sticky = navWrap.offsetTop;
    window.addEventListener('scroll', function () {
        if (window.pageYOffset >= sticky) {
            navWrap.classList.add('sticky');
            navWrap.classList.remove('static');
        } else {
            navWrap.classList.remove('sticky');
            // navWrap.classList.add('static')
        }
    });

    // var links = document.getElementsByTagName("a"); // more specific selector if other links
    // for (var i = 0; i < links.length; i++) {
    //     var link = links[i];
    //     link.onclick = function () {
    //         var prev = document.getElementsByClassName("active");
    //         if (prev && prev[0]) {
    //             prev[0].className = ""; // if using other classes, filter better
    //         }
    //         this.className += " active";
    //     };
    // }
};
//https://stackoverflow.com/questions/14389687/window-scroll-in-vanilla-javascript
//https://www.youtube.com/watch?v=bW8dIe2de_c
//https://codepen.io/jessicamarcus/pen/EvmRMg
},{}],"scripts/gallery.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var gallery = exports.gallery = function gallery() {
    var current = document.querySelector('#current');
    // the images are a list to be iterated over
    var imgs = document.querySelectorAll('.imgs img');
    // set opacity of thumbnails
    var opacity = 0.4;
    //set first img Opacity
    // imgs[0].style.opacity = opacity;
    imgs.forEach(function (img) {
        return img.addEventListener('click', imgClick);
    });

    function imgClick(e) {
        //reset opacity
        imgs.forEach(function (img) {
            return img.style.opacity = 1;
        });

        //change image to clicked
        current.src = e.target.src;
        // e.target.text.classList.add('show')
        //add fade in class
        current.classList.add('fade-in');
        // remove fadin class after .5s
        setTimeout(function () {
            return current.classList.remove('fade-in');
        }, 500);
        // change opacity
        e.target.style.opacity = opacity;
    }
};
},{}],"scripts/smooth.js":[function(require,module,exports) {

var html, body;

window.onload = function () {
  //getting all anchor elements
  var links = document.links;

  //getting html
  html = document.documentElement;

  //getting body
  body = document.body;

  for (var i = 0; i < links.length; i++) {
    links[i].onclick = function () {
      //getting current scroll position
      var scrollTop = Math.round(body.scrollTop || html.scrollTop);
      if (this.hash !== "") {
        //preventing default anchor click behavior
        event.preventDefault();

        //getting element with id found in hash
        var hashElement = document.getElementById(this.hash.substring(1));

        var hashElementTop = 0;
        var obj = hashElement;
        while (obj.offsetParent) {
          hashElementTop += obj.offsetTop;
          obj = obj.offsetParent;
        }
        //getting element's position
        hashElementTop = Math.round(hashElementTop);

        scroll(scrollTop, hashElementTop, this.hash);
      }
    };
  }
};

function scroll(from, to, hash) {
  var timeInterval = 0.0002; //in ms
  var prevScrollTop;
  var increment = to > from ? 10 : -10;

  var scrollByPixel = setInterval(function () {
    //getting current scroll position
    var scrollTop = Math.round(body.scrollTop || html.scrollTop);

    if (prevScrollTop == scrollTop || to > from && scrollTop >= to || to < from && scrollTop <= to) {
      clearInterval(scrollByPixel);
      //Add hash to the url after scrolling
      window.location.hash = hash;
    } else {
      body.scrollTop += increment;
      html.scrollTop += increment;

      prevScrollTop = scrollTop;
    }
  }, timeInterval);
}
},{}],"../../../.nvm/versions/node/v10.6.0/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
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
},{}],"../../../.nvm/versions/node/v10.6.0/lib/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
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
},{"./bundle-url":"../../../.nvm/versions/node/v10.6.0/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"index.css":[function(require,module,exports) {

var reloadCSS = require('_css_loader');
module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./img/worker.png":[["worker.70636309.png","img/worker.png"],"img/worker.png"],"./img/work.jpg":[["work.5a81a53b.jpg","img/work.jpg"],"img/work.jpg"],"_css_loader":"../../../.nvm/versions/node/v10.6.0/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"index.js":[function(require,module,exports) {
'use strict';

var _navbar = require('./scripts/navbar.js');

var _gallery = require('./scripts/gallery.js');

require('./scripts/smooth.js');
require('./index.css');
(0, _navbar.navbar)();
(0, _gallery.gallery)();
},{"./scripts/navbar.js":"scripts/navbar.js","./scripts/gallery.js":"scripts/gallery.js","./scripts/smooth.js":"scripts/smooth.js","./index.css":"index.css"}],"../../../.nvm/versions/node/v10.6.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + '34581' + '/');
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
},{}]},{},["../../../.nvm/versions/node/v10.6.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/src.eae935fd.map