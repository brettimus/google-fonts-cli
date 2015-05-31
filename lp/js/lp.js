(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var B = require("boots-utils");
var FontCollection = require("../../src/font-collection.js");
var FONTCACHE;
global.BooTemplate = require("boo-templates");
global.getFonts = function getFonts(path, next) {
    B.ajax.loadJSON(path, function(data) {
        var fonts = new FontCollection(data);
        if (next) next(fonts);
    }, function(err) {
        console.log("Getting font data failed. Here's the error: ", err);
    });

};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../src/font-collection.js":8,"boo-templates":3,"boots-utils":7}],2:[function(require,module,exports){
var B = require("boots-utils");

module.exports = Compiler;

/**
 * @constructor
 * @param {string} [open] - margs beginning of template string that's to be evaluated
 * @param {string} [close] - marks end of template string that's to be evaluated
 */
function Compiler(open, close) {
    this.open  = open  || "{{";
    this.close = close || "}}";
}

/**
 * Compiles a string in the given object's context 
 * @method
 */
Compiler.prototype.compile = function(string, object) {
    for (var prop in object) {
        if (object.hasOwnProperty(prop)) {
            string = B.replaceAll(string, this.open+prop+this.close, object[prop]);
        }
    }
    return string;
};
},{"boots-utils":7}],3:[function(require,module,exports){
var Compiler = require("./compiler");
var Template = require("./template");
var BooTemplate = Template;
BooTemplate.Compiler = Compiler;
module.exports = Template;
},{"./compiler":2,"./template":4}],4:[function(require,module,exports){
var Compiler = require("./compiler");

module.exports = Template;

/**
 * @constructor
 * @param {string} template - The template string
 * @param {string} [open] - margs beginning of a template value that's to be evaluated
 * @param {string} [close] - marks end of a template value that's to be evaluated
 */
 function Template(template, open, close) {
    this.template = template;
    this.compiler = new Compiler(open, close);
 }

/**
 * Wraps Compiler~compile with the target string scoped to Template~string
 * @method
 * @param {object} o - Ojbect whose values are inserted into the string.
 * @return {string}
 */
 Template.prototype.compile = function(o) {
     return this.compiler.compile(this.template, o);
 };


},{"./compiler":2}],5:[function(require,module,exports){
module.exports = {
    loadJSON: loadJSON,
};

/**
 * Shallow-copies an arbitrary number of objects' properties into the first argument. Applies "last-in-wins" policy to conflicting property names.
 * @function loadJSON
 * @param {string} path
 * @param {function} success
 * @param {function} error
 */
function loadJSON(path, success, error, context) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        context = context || this;
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) {
                    success.call(context, JSON.parse(xhr.responseText));
                }
            } else {
                if (error) {
                    error.call(context, xhr);
                }
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
    return xhr;
}
},{}],6:[function(require,module,exports){
module.exports = {
    first: first,
    isArray: isArray,
    randomInArray: randomInArray,
    range: range,
};

/**
 * Returns first element of array to return true in the given predicate function.
 * @function isArray
 * @param {array} ary
 * @param {function} predicate
 * @return {*}
 */
function first(ary, predicate, context) {
    var len = ary.length;
    for (var i = 0; i < len; i++) {
        if (predicate.call(context, ary[i])) {
            return ary[i];
        }
    }
}

/**
 * @function isArray
 * @param {*} o
 * @return {boolean}
 */
function isArray(o) {
    return Object.prototype.toString.call(o) === "[object Array]";
}

/**
 * 
 * @function range
 * @param {number} start
 * @param {number} end
 * @param {number} [step]
 */
function range(start, end, step) {
    step = step || 1;
    var result = [];
    for (;start <= end; start += step) result.push(start);
    return result;
}

/**
 * 
 * @function randomInArray
 * @param {array} ary
 * @return {*}
 */
function randomInArray(ary) {
    return ary[Math.floor(Math.random() * ary.length)];
}
},{}],7:[function(require,module,exports){
module.exports = {
    ajax: require("./ajax"),
    array: require("./array"),
    extend: extend,
    nully: nully,
    replaceAll: replaceAll,
};

/**
 * Tests whether value is null or undefined
 * @function esacpeRegExp
 */
function nully(x) {
    return x == null;
}

/**
 * Escapes a string for use in RegExp
 * @function esacpeRegExp
 */
function escapeRegExp(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }

/**
 * Globally replaces a given string in another string
 * @function replaceAll
 * @param {stirng} [options] - RegExp options (like "i").
 **/
function replaceAll(string, toReplace, replaceWith, options) {
    options = options || "";
    var reOpts = "g" + options,
        re     = new RegExp(escapeRegExp(toReplace), reOpts);

    return string.replace(re, replaceWith);
}

/**
 * Shallow-copies an arbitrary number of objects' properties into the first argument. Applies "last-in-wins" policy to conflicting property names.
 * @function extend
 * @param {...Object} o
 */
function extend(o) {
    var args   = [].slice.call(arguments, 0),
        result = args[0];

    for (var i=1; i < args.length; i++) {
        result = extendHelper(result, args[i]);
    }

    return result;
}

/**
 * Shallow-copies one object into another.
 * @function extendHelper
 * @param {Object} destination - Object into which `source` properties will be copied.
 * @param {Object} source - Object whose properties will be copied into `destination`.
 */
function extendHelper(destination, source) {
    // thanks be to angus kroll
    // https://javascriptweblog.wordpress.com/2011/05/31/a-fresh-look-at-javascript-mixins/
    for (var k in source) {
        if (source.hasOwnProperty(k)) {
          destination[k] = source[k];
        }
    }
    return destination;
}
},{"./ajax":5,"./array":6}],8:[function(require,module,exports){
var B = require('boots-utils');

module.exports = FontCollection;

/**
 * @constructor
 * @param {Font[]} data - A json blob from the google-fonts-api
 */
function FontCollection(data) {
    this.FONTS = data.items;
} 

/** currently only searches for family */
FontCollection.prototype.find = function(options) {
    var family = options.family;

    for (var i = 0; i < this.FONTS.length; i++) {
        if (this.FONTS[i].family === family) {
            return this.FONTS[i];
        }
    }
};

FontCollection.prototype.random = function(category, variants) {
    var fonts = [];
    // TODO - refactor. can this in one pass instead of two
    // TODO - resolve whether the parameters are treated as "and" or "or"w
    if (variants) {
        fonts = this.FONTS.filter(_fontVariantFilter);
    }
    if (category) {
        fonts = fonts.concat(this.FONTS.filter(_fontCategoryFilter));
    }
    if (fonts.length === 0) fonts = this.FONTS;
    return B.array.randomInArray(fonts);

    function _fontCategoryFilter(font) {
        return font.category === category;
    }

    function _fontVariantFilter(font) {
        // TODO - optimize, low priority
        return variants.some(function(variant) {
            return font.variants.some(function(fontVariant) {
                return variant === fontVariant;
            });
        });
    }
};


},{"boots-utils":7}]},{},[1]);
