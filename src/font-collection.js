var B = require('boots-utils');

module.exports = FontCollection;

/**
 * @constructor
 * @param {Font[]} data - A json blob from the google-fonts-api
 */
function FontCollection(data) {
    this.FONTS = data.items;
}

/** currently only searches for family */
FontCollection.prototype.find = function(options) {
    var family = options.family;

    for (var i = 0; i < this.FONTS.length; i++) {
        if (this.FONTS[i].family === family) {
            return this.FONTS[i];
        }
    }
};

FontCollection.prototype.random = function(category, variants) {
    var fonts = [];
    // TODO - refactor. can this in one pass instead of two
    // TODO - resolve whether the parameters are treated as "and" or "or"
    if (variants) {
        fonts = this.FONTS.filter(_fontVariantFilter);
    }
    if (category) {
        fonts = fonts.concat(this.FONTS.filter(_fontCategoryFilter));
    }
    if (fonts.length === 0) fonts = this.FONTS;
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

