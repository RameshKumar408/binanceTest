/* eslint-disable camelcase */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
require('dotenv-safe').config()
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const compression = require('compression')
const helmet = require('helmet')
const cors = require('cors')
const passport = require('passport')
const app = express()
const i18n = require('i18n')
const initMongo = require('./config/mongo')
const path = require('path')
global.CronJob = require('./database-backup/cron.js')
const WebSocket = require('ws')

// Setup express server port from ENV, default: 3000
app.set('port', process.env.PORT || 3000)

// Enable only in development HTTP request logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Redis cache enabled by env variable
if (process.env.USE_REDIS === 'true') {
  const getExpeditiousCache = require('express-expeditious')
  const cache = getExpeditiousCache({
    namespace: 'expresscache',
    defaultTtl: '1 minute',
    engine: require('expeditious-engine-redis')({
      redis: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
      }
    })
  })
  app.use(cache)
}

const ws = new WebSocket('wss://stream.binance.com:9443/ws')

var high = 0;
var low = 0;

var oldhigh = 0;
var oldlow = 0;
ws.on('open', () => {
  const data = {
    method: 'SUBSCRIBE',
    params: ['xrpusdt@ticker'],
    id: 1
  }
  ws.send(JSON.stringify(data))
})
ws.on('message', (data, flags) => {
  const get_data = JSON.parse(data)
  if (get_data.c !== undefined) {
    if (high === 0 && low === 0) {
      high = get_data.c
      low = get_data.c
    } else if (high < get_data?.c) {
      console.log(high, low, "asdf")
      high = get_data?.c
      console.log("high")
    } else if (low > get_data.c) {
      console.log(high, low, "asdf")
      console.log("low")
      low = get_data?.c
    } else {
      console.log(high, low, "asdf")
      high = get_data?.c
      console.log("high")
    }
  }


  // flags.binary will be set if a binary data is received
  // flags.masked will be set if the data was masked
})

console.log(high, low, 'low')
// for parsing json
app.use(
  bodyParser.json({
    limit: '20mb'
  })
)
// for parsing application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    limit: '20mb',
    extended: true
  })
)

// i18n
i18n.configure({
  locales: ['en', 'es'],
  directory: `${__dirname}/locales`,
  defaultLocale: 'en',
  objectNotation: true
})
app.use(i18n.init)

// Init all other stuff
app.use(cors())
app.use(passport.initialize())
app.use(compression())
app.use(helmet())
app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use(require('./app/routes'))
app.listen(app.get('port'))
// An error handling middleware
process.on('uncaughtException', (error, origin) => {
  console.log('----- Uncaught exception -----')
  console.log(error)
  // console.log('----- Exception origin -----')
  // console.log(origin)
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('----- Unhandled Rejection at -----')
  console.log(promise)
  // console.log('----- Reason -----')
  // console.log(reason)
})

// Init MongoDB
initMongo()

module.exports = app // for testing
