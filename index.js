#! /usr/bin/env node

var jsdom = require("jsdom");
var fs = require("fs");
var newDoc = require("./dom");

var options = process.argv.splice(2),
    file    = options[0] || "./test/index.html",
    font    = options[1] || "Roboto",
    variants = options.slice(2);

jsdom.env({
    file: file,
    done: parse(write),
});

function parse(next) {
    return function(errors, window) {
        var document = window.document;
        var html = newDoc(document, font, variants);
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

