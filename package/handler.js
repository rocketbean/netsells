const Base = require('./base');
const log = require('./Logger');
const socketio = require("socket.io");
const Negotiator = require('./cluster');
const Chasi = require('./framework/chasi/chasi')
const fileUpload = require('express-fileupload');
const Injector = require('./bootloader/injector');
const framework = require('./framework/frontload');
const Controller = require('./statics/Controller');
const Models = require('./statics/Models');
const Middlewares = require('./statics/Middlewares');
const Adapter = require('./statics/Adapter');
const ServerWrap = require('./framework/exec/server');
const SocketWrapper = require('./framework/exec/socket');
const Configurator = require('./bootloader/configurator');
const PackageLoader = require('./framework/PackageLoader');
const ErrorHandler = require('./framework/error/ErrorHandler');
const SocketAdapter = require('./framework/chasi/adapters/SocketAdapters');
const AuthorizationDriver = require('./framework/chasi/Authorization');
const Observer = require("./observer");
const { networkInterfaces } = require('os');
const Compiler = require("./framework/chasi/Compiler")

class PackageHandler extends Negotiator(Injector, ErrorHandler) {

  constructor (property) {
    super();
    this.property = property
    this.installed = false
    this.ready = false
    this.status = 'untapped'
    this.internals = {};
    this.packages = null;
    this.dbconnections = {};
    this.$compiler = {}
  }


  /**
   * runtime status log 
   * @param {RunTime Log} message 
   */
  setStatus (message) {
    log.full("", "system")
    log.full(message.toUpperCase(), "system")

    this.status = message
  }

  /**
   * initializes static classes
   */
  async init() {
    try {
      framework.loadStaticProperty(this._g, this.property)
      this.$observer = await Observer.init(this.property.events)
      let fw = new framework()
      this.internals = await fw.callstack(this._g);
      this.setStatus("initialized");
      await this.before()
    } catch (e) {
      log.msg(e.stack, 0 , "danger")
    }
  }

  /**
   * instantiate dependency class
   * before app instance
   */
  async before () {
    try {
      this.$app = this.internals.app;
      ServerWrap.initialize(this._g, this.property, this.$app);
      this.internals['server'] = new ServerWrap();
      this.$server = this.internals.server.install();
      await this.connectDbInstsance();
      this.$io = socketio(this.$server);
      SocketAdapter.setIo(this.$io);
      Base.install(this._g, this.property, this.$server, this.$app);
      this.injectCorsProperties();
      this.$packages = new PackageLoader();
      await this.prepareCompiler();
      await this.initializeServices();
      this.setStatus("setting up server");
      this.instantiate();
    } catch (e) {
      log.msg(e.stack, 0 , "danger")
    }
  }

  /* * *
   * create Chasi instance
   * * *
   */
  async instantiate () {
    try {
      this.$app.use(this._g.express.json())
      this.setupRouteLayerNet()
      this.$app.use(fileUpload())
      this.$app.use(this._g.bodyParser.urlencoded({extended: true}));
      this.$chasi = await Chasi.install(this.$app, {
        $packages: this.$packages,
        $server: this.$server,
        $io: this.$io
      });
      this.setStatus("Instantiating App Class");
      this.after(); 
    } catch (e) {
      log.msg(e.stack, 0 , "danger")
    }
  }

  async initializeServices() {
    Models.assignModels(this.property.app.modelsDir);
    Middlewares.assignMiddlewares(this.property.app.middlewares);
    await Controller.init(
      this.property,
      this.$packages,
      this.$observer
    );
  }
  async setupQueRoutes() {
    this.$app._router.stack.map(async layer => {
      if(layer?.route) {
        await AuthorizationDriver.implementAppGuard(layer)
      }
    })
  }

  async after () {
    this.boot()
    this.setStatus("after App Instance");
    this.CheckStaticErrors();
    await this.setupQueRoutes()

    this.$app.use('/static',
      this._g.express.static(`${basepath}/public`)
    );

    this.$app.use((req, res, next) => {
      if(this.property['error-responses'].hasOwnProperty('404')) {
        res.status(404).send(this.property['error-responses']['404']);
      } else {
        res.send(this.property['error-responses']._default);
      }
    });

  }

  async prepareCompiler () {
    if(this.$packages.installedPackages.hasOwnProperty("Compiler")) {
      if(this.property.compiler.enabled) {
        await this.$packages.installedPackages.Compiler.setup();
        Controller.bindCompilerInstance( await this.$packages.installedPackages.Compiler.engine.start(this.$app) );
      }
    }
  }

  boot () {
    this.$server.listen(this.property.server.port, async () => {
      log.center('SERVING IN:', 'cool')
      let nets = networkInterfaces();
      Object.keys(nets).forEach(key => {
        nets[key].filter(addr => addr.family == 'IPv4')
          .forEach(net =>{
            let protocol = this.internals.server.property.cert.protocol
            let ipv = net.address=='127.0.0.1'? 'localhost' : net.address
            log.full(`  ${protocol}://${ipv}:${this.property.server.port}`, 'silver', ' ');
          })
      })
    })
  }

  /**
   * read filestring path
   * @param {filesystem} path 
   */
  getFileSync (path) {
    return this._g.fs.readFileSync(path)
  }

  /**
   * connect database instance
   */
  async connectDbInstsance () {
    if(this.property.database.bootWithDB) this.dbconnections = await this.internals.database.connectAll();
    else this.dbconnections = await this.internals.database?.connectAll();
    await Adapter.init(this.property, this.dbconnections);
    return;
  }

  /**
   * setup route layer network
   */
  setupRouteLayerNet () {
    this.$app.getRouteLayer = function (url, method) {
      let parsed = url.split('?')[0] // Routes with query
      parsed = parsed.UrlStringFormat()
      return this._router.stack.find(layer => {
        if(!method) return (layer.regexp.exec(parsed) && layer.route);
        return (layer.regexp.exec(parsed) && layer.route) &&
          (layer.route.stack[0].method.toLowerCase() == method.toLowerCase())
      })
    }

    this.$app.routeLayer = function (url, method) {
      let parsed = url.split('?')[0] // Routes with query
      parsed = parsed.UrlStringFormat()
      return this._router.stack.find(layer => {
        return (layer.regexp.exec(parsed) && layer.route) &&
          (layer.$chasi.route.method.toLowerCase() == method.toLowerCase())
      })
    }
  }

  CheckStaticErrors() {
    ErrorHandler.tail();
  }

  injectCorsProperties () {
    this.$app.use(this._g.cors(this.property.cors));
  }

  static async install(dir) {
    let ph = new PackageHandler(new Configurator().bootload());
    await ph.init();
    return ph;
  }
}
module.exports = PackageHandler;