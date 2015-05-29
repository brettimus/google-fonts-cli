var B = require("boots-utils");
global.randomFont = randomFont;

B.ajax.loadJSON("./../fonts.json", success);

var FONTS;
function success(data) {
    FONTS = data.items;
}

function randomFont(category, variants) {
    category = category || "sans-serif";
    variants = variants || [];
    var fonts = FONTS.filter(_fontVariantFilter).concat(FONTS.filter(_fontCategoryFilter));
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

function _randomFromArray(ary) {
    var len = ary.length;
    return ary[Math.floor(Math.random()*len)];
}