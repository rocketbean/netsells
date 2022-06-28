const DataTransfomer = require("./../DataTransformer");

module.exports = class ConversionTransformer extends DataTransfomer{
  constructor(data) {
    super();
    this.data = data;
    this.format = ["converted", "value", "type", "count"]
  }

}