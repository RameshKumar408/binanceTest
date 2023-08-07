const { createAsset } = require('./createAsset')
const { updateAsset } = require('./updateAsset')
const { getAllAssets } = require('./getAllAssets')
const { getAssets } = require('./getAssests')
const { getAsset } = require('./getAsset')
const { getAssetBySymbol } = require('./getAssetBySymbol')

module.exports = {
    createAsset,
    updateAsset,
    getAllAssets,
    getAssets,
    getAsset,
    getAssetBySymbol
}