// Vendor
var B = require("boots-utils"),
    jsdom = require("jsdom"),
    fs = require("fs"),
    path = require("path");

// Objects for reading the file and writing a new one
var Fonter = require("./fonter"),
    Parser = require("./parser"),
    Writer = require("./writer"),
    FontCollection = require("./font-collection");

module.exports = Program;

// if you can't tell by the name, this does too much and needs to be rethought
function Program(args, fonts) {
    fonts = fonts || JSON.parse(fs.readFileSync(path.join(__dirname, "../data/fonts.json")).toString());
    this.fonts = new FontCollection(fonts);

    Fonter.call(this);
    if (!args[0]) {
        this.printUsage("***Error: Must provide a path to file.***");
        process.exit(1);
    }

    this.htmlFile = path.join(process.cwd(), args[0]);

    if (!args[1]) {
        this.fontData = this.fonts.random();
        this.fontFamily = this.fontData.family;
    }
    else {
        this.fontFamily = args[1].split("-").join(" "); // allows us to use fonts with spaces in their names (just sub in hyphens)
        this.variants   = args.slice(2);
        this.fontData = this.fonts.find({family: this.fontFamily, variants: this.variants});
    }

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
            if (errs) {
                console.log(errs);
                _this.printUsage("Oops! Something went wrong.\n");
                process.exit(1);
            }
            var document = window.document;
            (new Parser(document)).parse(function(data) {
                (new Writer(_this.fontFamily, _this.variants, data)).write(_this.htmlFile);
            });
        },
    });
};