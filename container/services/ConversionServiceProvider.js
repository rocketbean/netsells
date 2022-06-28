const  Conversion = require("../modules/ConversionModule")
  class ConversionServiceProvider {
    
    static async boot () {

        return Conversion;
    }
  }
  module.exports = ConversionServiceProvider