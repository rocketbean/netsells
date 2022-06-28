
const ConversionTransformer = require("./transformers/ConversionTransformer")
class Transformer {

  static transformers = {
    ConversionTransformer
  } 

  static initialize (transformer, data) {
    return new Transformer.transformers[transformer](data);
  }
}

module.exports = Transformer