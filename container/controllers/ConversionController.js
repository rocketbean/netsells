
const Controller = handle("/package/statics/Controller");

class ConversionController extends Controller {

  get conversion () {
    return this.services.conversion
  }

  get Transformer () {
    return this.services.transformer
  }

  get conversion_model () {
    return this.models.conversions
  }

  /**
   * method for converting the given integer to 
   * Roman Numerals
   * @param {request, response} [ExpressRequest||ExpressResponse] Object
   * @return {Transformer} translated as [ExpressResponse] Object
   * */
  async convert(request, response) {
    let roman = this.conversion.init(request.params.value, request.params.type, {
      $observer: this.$observer
    });
    return this.Transformer.initialize('ConversionTransformer',
      await roman.convert()).transform();
  }

  /**
   * recent cenvertions of 
   * Roman Numerals
   * @param {request, response} [ExpressRequest||ExpressResponse] Object
   * @return {Transformer} translated as [ExpressResponse] Object
   * */
  async recent(request, response) {
    return this.Transformer.initialize('ConversionTransformer',
      await this.conversion_model.find({}).sort({ field: 'asc', updatedAt: -1 }).limit(parseInt(request.params.items)))
      .include(["updatedAt", "createdAt"])
      .transform()

  }


  /**
   * top listings for
   * Roman Numerals
   * @param {request, response} [ExpressRequest||ExpressResponse] Object
   * @return {Transformer} translated as [ExpressResponse] Object
   * */
  async top(request, response) {
    return this.Transformer.initialize('ConversionTransformer',
      await this.conversion_model.find({}).sort({ field: 'asc', count: -1 }).limit(parseInt(request.params.items)))
      .exclude("type")
      .transform()
  }
}

module.exports = new ConversionController()