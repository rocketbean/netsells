const Roman = require ("./types/Roman");
const Conversion = require("./../../Models/Conversions")

class ConversionModule {
  static constructors = ['conversions'];
  static types = {
    Roman
  }

  constructor (value, type, props) {
    this.observer = props
    this.data = {}
    this.data.value = value
    this.data.type = type
    this.data.converted = ''
    this.instance = new ConversionModule.types[this.data.type];
  }

  async convert () {
    this.data.converted = this.instance.convert(this.data.value);
    return await this.checkEntry()
  }

  async checkEntry () {
    let conv = await Conversion.findOne({converted: this.data.converted});
    if(!conv) return this.save()
    else return this.update(conv)
  }

  async update (conv) {
    conv.count += 1
    return await conv.save()
  }

  async save () {
    this.data.count = 1
    return await new Conversion(this.data).save()
  }

  static init (v, type, props) {
    return new ConversionModule(v, type.capitalize(), props);
  }
}

module.exports = ConversionModule;