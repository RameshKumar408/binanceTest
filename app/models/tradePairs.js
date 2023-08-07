const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TradePairSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)
TradePairSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('TradePairs', TradePairSchema)
