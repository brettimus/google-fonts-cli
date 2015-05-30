var B = require('boots-utils');

module.exports = Fonts;

function Fonts(data) {

}

Fonts.prototype.find = function(options) {
    throw new Error("NYI");
};

Fonts.prototype.random = function() {
    var category = this.fontFamily || "sans-serif";
    var variants = variants || [];
    var fonts = this.FONTS
                        .filter(_fontVariantFilter)
                        .concat(FONTS.filter(_fontCategoryFilter));

    return B.array.randomInArray(fonts);

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
};

