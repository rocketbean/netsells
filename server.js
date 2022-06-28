require('dotenv').config()
basepath = __dirname;

const helpers = require('./package/helper');
const Events = require ('./package/events');
const log = require('./package/Logger');

global.events = new Events();
global.log = log;
const Package = require('./package/handler');

module.exports = (async () => {
  return (await Package.install(__dirname)).$app;
})()

