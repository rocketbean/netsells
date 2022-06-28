const User = require("../Models/User");
const adapter = require("../../package/framework/chasi/adapters/adapters")
const mongoose = require("mongoose")
const ObjectId = mongoose.Types.ObjectId; 
const Controller = require("../../package/statics/Controller");

class UserController extends Controller {

    static unguarded = ['name', 'alias', 'avatar'];

}

module.exports = new UserController();