const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const WalletSchema = new mongoose.Schema(
  {
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSchema',
    },
    assets: {
      type: String,
      required: true
    },
    mukavari: {
      type: Array,
      default : [],
      required: false
    },
    payment_id: {
        type: String,
        required: false
    },
    balance: {
        type: Number,
        default: 0
    },
    escrow_balance: {
        type: Number,
        default: 0
    },
  },
  {
    versionKey: false,
    timestamps: true
  }
)
WalletSchema.plugin(mongoosePaginate)
module.exports = mongoose.model('Wallet', WalletSchema)