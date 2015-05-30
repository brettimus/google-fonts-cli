var Fonter = require("./fonter");

module.exports = Parser;

/** @constructor */
function Parser(document) {
    if (!document) {
        this.printUsage();
        throw new Error("Could not parse document, or it was blank.");
    }
    this.document = document;
}
Parse.prototype = Object.create(Fonter.prototype);

/** passes along data about an html document */
Parser.prototype.parse = function parse(next) {
    var hasHead = !!(document.querySelector("head")),
        hasLinkTag = !!(document.querySelector("link")),
        result = {
            hasHead: hasHead,
            hasLinkTag: hasLinkTag,
            document: document,
        };
    if (next) {
        next(result);
        return this;
    }
    return result;
};