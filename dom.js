module.exports = newDoc;

function newDoc(document, font, variants) {
    var head = document.querySelector("head");
    if (!head) throw new Error("Target HTML document must have a 'head' tag");

    var firstLinkTag = document.querySelector("link");
    if (firstLinkTag) {
        head.insertBefore(createLink(document, font, variants), firstLinkTag);
        return assembleDoc(document);
    }
    else {
        return false;
    }
}


function assembleDoc(document) {
    return  _cleanUp(_createDOCTYPE(document) + document.documentElement.outerHTML);
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
