var B = require("boots-utils");
var FontCollection = require("../../font-collection.js");

global.getFonts = function getFonts(path, next) {
    B.ajax.loadJSON(path, function(data) {
        var fonts = new FontCollection(data);
        if (next) next(fonts);
    }, function(err) {
        console.log("Getting font data failed. Here's the error: ", err);
    });

};