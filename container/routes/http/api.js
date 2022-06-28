const route = require("../../../package/framework/chasi/Routing/Route");
const { excludeFromProperty } = require("../../controllers/UserController");

module.exports = function() {
    
    /* * * * * * * * * *  Route Endpoint Registry * * * * * * *
    * this registry will serve as the routing container, 
    * please make sure that this is registered in 
    * [container/services/RouterServiceProvider]
    * also check [config/authentication.js] ,
    * by default, API's that is registered through auth config, 
    * will be protected by JWT unless registered in 
    * [AuthRouteExceptions] array option.
    */

    route.group({group: "conversions", prefix: "conversions"}, (() => {
        route.group({group: "conversion_type", prefix: ":type", middleware: ['conversion-types']}, (() => {

            route.post("convert/:value", "ConversionController@convert").middleware('conversion-limit');

            route.post("recent", "ConversionController@recent").middleware('item-limit');
            route.post("recent/:items", "ConversionController@recent");

            route.post("top", "ConversionController@top").middleware('item-limit');
            route.post("top/:items", "ConversionController@top");
        }));
    }));
}
