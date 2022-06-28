module.exports = class DataTransformer {
  constructor () {
    this.transformed;
  }

  transform () {
    if(Array.isArray(this.data)) {
      this.transformed = this.data.map(data => this.pick(data.toJSON(), this.format))
    }
    else this.transformed =  this.pick(this.data.toJSON(), this.format)
    return this.transformed
  }

  include (field) {
    if(Array.isArray(field)) this.format.push(...field)
    else this.format.push(field)
    return this
  }

  exclude (field) {
    if(Array.isArray(field)) {
      this.format = this.format.filter(f => (!field.includes(f)))
    }
    else this.format = this.format.filter(f => f !== field)
    return this
  }

  pick (obj, keys) {
    return Object.keys(obj)
    .filter(i => {
      return keys.includes(i)
    }).reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {})
  }



}