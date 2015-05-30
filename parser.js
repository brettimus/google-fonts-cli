
/** @constructor */
function Parser(document) {
    this.document = document;
}

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