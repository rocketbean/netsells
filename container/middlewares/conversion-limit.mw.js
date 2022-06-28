
  let min = 1, max = 3999;
  /*
  * * *
  * 
  * @params {request, response, next}
  * @request [ExpressRequest]
  * @response [ExpressResponse]
  * 
  * @next [Fn] ()
  * * *
  */
  module.exports = async (request, response, next) => {
    try {
      let value = request.params.value;
      if(value < min || value > max) return response.status(400).send(`value cannot be less than [${min}] or greater than [${max}]`)
      next();
    } catch(e) {}

  }