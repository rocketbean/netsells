const  Transformer = require("../modules/Transformer")

  class TransformerServiceProvider {
    
    static async boot () {
      return Transformer;
    }
  }
  module.exports = TransformerServiceProvider