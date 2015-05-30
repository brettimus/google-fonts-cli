#! /usr/bin/env node

var Writer = require("./writer.js");

var jsdom = require("jsdom");
var fs = require("fs");
var path = require("path");
var newDoc = require("./dom");
var args = process.argv.splice(2);




if (!args[0]) {
    console.log("\n\n***Error: Must provide a path to file.***");
    printUsage();
    return;
}
var htmlFile   = path.join(process.cwd(),(args[0])),
    fontFamily = args[1],
    variants   = args.slice(2),
    fontData;

if (!args[1]) {
    fontFamily = randomFont().name; // TODO optimize, this is dumb bc of for loop below
}

var FONTS = JSON.parse(fs.readFileSync(path.join(__dirname, "fonts.json")).toString()).items;
var numFonts = FONTS.length;
var i;


for (i = 0; i < numFonts; i++) {
    if (FONTS[i].family === fontFamily) {
        fontData = FONTS[i];
        break;
    }
}

if (!fontData) {
    console.log("Sorry, "+fontFamily+" was not found. Try updating your font data?");
    return;
}

jsdom.env({
    file: htmlFile,
    done: function(errs, window) {
        var document = window.document;
        (new Parser(document)).parse(function(data) {
            (new Writer(fontFamily, variants, data)).write(file);
        });
    },
});


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
