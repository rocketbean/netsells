module.exports = {
    name: checkout(process.env.APPNAME, 'Chasi'),

    /**
     * Chasi will autoload this dirs,
     * look for models / schemas
     * then bind it to
     * [Event|Controller]Class
     */
    modelsDir: [
        'container/Models/'
    ],

    /**
     * install out of the box packages
     * into the app container
     */
    LoadPack: {
        'Sessions': 'package/framework/storage/session::init',
        'Compiler': 'package/framework/chasi/Compiler::init',
        'FileManager': 'container/modules/FileManager::init',
    },

    /**
     * Service Bootstrap
     * boostrapping app services
     */
    ServiceBootstrap: {

        /* * * * * * * * * * * * * * * * * *
         * this settings is mostly for 
         * * * * * * * [Chasi] extensions * * * *
         * this services is left outside the Chasi box due to the
         * interactions developers need to associate with this services,
         * therefore giving more versatility for dev's 
         * 
         */
        'routers': 'container/services/RouterServiceProvider',
        'auth': 'container/services/AuthServiceProvider',
        'sockets': 'container/services/SocketServiceProvider',
        'conversion': 'container/services/ConversionServiceProvider',
        'transformer': 'container/services/TransformerServiceProvider',
        
    },

    /**
     * Middlewares
     * any middlewares pointed to a 
     * route or route group or even in a route 
     * containers, should be registered here
     */
    middlewares: {
        /**
         * Register your middlewares here.
         * [alias] => "<your middleware path in (container/middlewares/*)>"
         * after registration the middlewares will then 
         * be installed to that Chasi Route MWs Repository,
         * then you can use it in your routes
         */
        'conversion-limit': "/middlewares/conversion-limit.mw.js",
        'conversion-types': "/middlewares/conversion-types.mw.js",
        'item-limit': "/middlewares/default-item-limit.mw.js",
        
    }

}
