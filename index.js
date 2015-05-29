#! /usr/bin/env node

var jsdom = require("jsdom");
var fs = require("fs");
var path = require("path");
var newDoc = require("./dom");


var options = process.argv.splice(2);

var file    = path.join(process.cwd(),(options[0])),
    fontFamily = options[1],
    variants = options.slice(2),
    fontData;

var FONTS = JSON.parse(fs.readFileSync(path.join(__dirname, "fonts.json")).toString()).items;
var numFonts = FONTS.length;
var i;


if (!options[0]) {
    console.log("\n\n***Error: Must provide a path to file.***");
    printUsage();
    return;
}

if (!options[1]) {
    // console.log("\n\n***Error: Must provide a font name.***");
    // printUsage();
    // return;
    fontFamily = randomFont().name; // TODO optimize, this is dumb bc of for loop below
}


for (i = 0; i < numFonts; i++) {
    if (FONTS[i].family === fontFamily) {
        fontData = FONTS[i];
        break;
    }
}

if (!fontData) {
    console.log("Sorry, "+fontFamily+" was not found. Try updating the font data?");
    return;
}

jsdom.env({
    file: file,
    done: parse(write),
});

function parse(next) {
    return function(errors, window) {
        var document = window.document;
        var html = newDoc(document, fontFamily, variants);
        if (!html) return console.log('Error! could not parse input file');
        if (next) next(html);
    };
}

function printUsage() {
    console.log("\nSomething goofed up!\nUsage is:\n $ gfi <file> <font-name> <font-variants>");
}

function write(html) {
    fs.writeFile(file, html, function(err) {
        if (err) {
            console.log(err);
            printUsage();
        }
    });
}

function randomFont(category, variants) {
    category = category || "sans-serif";
    variants = variants || [];
    var fonts = FONTS.filter(_fontVariantFilter).concat(FONTS.filter(_fontCategoryFilter));
    console.log(_randomFromArray(fonts));
    return _randomFromArray(fonts);

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
}

function _randomFromArray(ary) {
    var len = ary.length;
    return ary[Math.floor(Math.random()*len)];
}

function _extend(dest, src) {
    var prop;
    for (prop in src) {
        if (src.hasOwnProperty(prop)) {
            dest[prop] = src[prop];
        }
    }
}

