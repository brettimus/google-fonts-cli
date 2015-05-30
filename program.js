// Vendor
var B = require("boots-utils"),
    jsdom = require("jsdom"),
    fs = require("fs"),
    path = require("path");

// Objects for reading the file and writing a new one
var Fonter = require("./fonter"),
    Parser = require("./parser"),
    Writer = require("./writer");

module.exports = Program;

// if you can't tell by the name, this does too much
function Program(args) {
    var FONTS;
    Fonter.call(this);
    if (!args[0]) {
        this.printUsage("***Error: Must provide a path to file.***");
        process.exit(1);
    }

    this.htmlFile = path.join(process.cwd(), args[0]);

    if (!args[1]) {
        args[1] = this._randomFont().name; // TODO optimize, this is dumb bc of for loop below
    }

    this.fontFamily = args[1];
    this.variants   = args.slice(2);

    // i don't think this should be _here_ (in the object)
    this.FONTS = FONTS = JSON.parse(fs.readFileSync(path.join(__dirname, "fonts.json")).toString()).items;

    for (var i = 0; i < this.FONTS.length; i++) {
        if (this.FONTS[i].family === this.fontFamily) {
            this.fontData = FONTS[i];
            break;
        }
    }

    this.fontData = B.array.first(this.FONTS, function(font) {
        return font.family === this.fontFamily;
    }, this);

    if (!this.fontData) {
        this.printUsage("Sorry, "+this.fontFamily+" was not found. Try updating your font data.");
        process.exit(2);
    }
}
Program.prototype = Object.create(Fonter.prototype);

Program.prototype.run = function() {
    // body...
    var _this = this;
    jsdom.env({
        file: this.htmlFile,
        done: function(errs, window) {
            var document = window.document;
            (new Parser(document)).parse(function(data) {
                (new Writer(_this.fontFamily, _this.variants, data)).write(_this.htmlFile);
            });
        },
    });
};