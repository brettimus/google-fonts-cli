var fs = require("fs"),
    Fonter = require("./fonter");

module.exports = Writer;

function Writer(font, variants, data) {
    if (!data.hasHead) throw new Error("Document must have head tag");
    this.font = font;
    this.variants = variants;
    this.priorLink = data.hasLinkTag;
    this.document = data.document;
}
Writer.prototype = Object.create(Fonter.prototype);

Writer.prototype.assemble = function assemble() {
    var head = this.document.querySelector("head"),
        firstLinkTag = this.document.querySelector("link");
    head.insertBefore(createLink(this.document, this.font, this.variants), firstLinkTag);
    return assembleDoc(this.document);
};

Writer.prototype.writeFile = function writeFile(file) {
    var html = this.assemble();

    fs.writeFile(file, html, function(err) {
        if (err) {
            console.log(err);
            this.printUsage();
        }
    });
    return this;
};

Writer.prototype.write = function write(file) {
    this.writeFile(file);
};

function assembleDoc(document) {
    return _cleanUp(_createDOCTYPE(document) + document.documentElement.outerHTML);
}

function createLink(document, font, variants) {
    var result = document.createElement("link");
    result.rel = "stylesheet";
    result.type = "text/css";
    result.href = "http://fonts.googleapis.com/css?family="+_fontString(font, variants);
    return result;
}

function _createDOCTYPE(document) {
    // Thanks:
    // https://stackoverflow.com/questions/6088972/get-doctype-of-an-html-as-string-with-javascript
    var node = document.doctype;
    var html = "<!DOCTYPE " +
                node.name +
                (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') +
                (!node.publicId && node.systemId ? ' SYSTEM' : '') +
                (node.systemId ? ' "' + node.systemId + '"' : '') +
                '>\n';
    return html;
}

function _fontString(font, variantsArray) {
    var result = font;
    if (variantsArray && variantsArray.length > 0) {
        result += ":" + variantsArray.shift();
        if (variantsArray.length > 0) {
            result += "," + variantsArray.join(",");
        }
    }
    return result;
}

function _cleanUp(html) {
    var re = /[^\s](\s* )(<link.*?>)(<link.*?>)/;
    var match = re.exec(html);
    var indent = match[1];
    return html.replace(match[3], match[1]+match[3]);
}