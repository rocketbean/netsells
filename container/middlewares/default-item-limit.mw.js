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
    if(!request.params.hasOwnProperty("items")) request.params.items = 10
    next();
  }