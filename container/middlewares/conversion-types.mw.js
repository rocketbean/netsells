
  const validTypes = [
    'roman'
  ]

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
    request.params.type = request.params.type.toLowerCase();
    if(!validTypes.find(vtype => request.params.type === vtype)) return response.status(400).send(`invalid conversion type.`)
    next();
  }