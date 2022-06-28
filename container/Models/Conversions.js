
  const mongoose = require("mongoose")
  const __v = require("validator")
  const Adapter = require("../../package/statics/Adapter")
  
  let ConversionsSchema = new mongoose.Schema({
    /* *
    * Model Data Structure
    * */
    value: {
      type: Number,
      required: true
    },
    converted: {
      type: String,
      required: true,
      unique: true
    },
    type: {
      type: String,
      default: "roman",
      required: true
    },
    count: {
      type: Number,
      required: true
    }
  }, {
    timestamps: true,
  })
  
  ConversionsSchema.methods.toJSON = function () {
    const Conversions = this
    const ConversionsObject = Conversions.toObject()

    return ConversionsObject;
  }
  
  module.exports = Adapter.getConnection('conversions', ConversionsSchema)