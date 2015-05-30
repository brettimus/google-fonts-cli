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
Parser.prototype = Object.create(Fonter.prototype);

/** passes along data about an html document */
Parser.prototype.parse = function parse(next) {
    var hasHead = !!(this.document.querySelector("head")),
        hasLinkTag = !!(this.document.querySelector("link")),
        result = {
            hasHead: hasHead,
            hasLinkTag: hasLinkTag,
            document: this.document,
        };
    if (next) {
        next(result);
        return this;
    }
    return result;
};