const { validateCreateAsset } = require("./validateCreateAsset")
const { validateUpdateAsset } = require("./validateUpdateAsset")
const { validateGetAsset } = require("./validateGetAsset")
const { validateAssetSymbol } = require("./validateAssetSymbol")

module.exports = {
    validateCreateAsset,
    validateUpdateAsset,
    validateGetAsset,
    validateAssetSymbol
}