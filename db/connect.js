"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let config = require("../config");
var mongoose = require("mongoose");
const q = require("q");
let conn;
class Connect {
    constructor() {
        this.mongoHost = config.database.host;
        this.mongoPort = config.database.port;
        this.monogoMainDb = config.database.mainDb;
    }
    createConnection() {
        try {
            mongoose.Promise = q.Promise;
            conn = mongoose.createConnection(`mongodb://${this.mongoHost}:${this.mongoPort}/${this.monogoMainDb}`, { useNewUrlParser: true });
        }
        catch (e) {
            console.log(e);
        }
        return conn;
    }
}
exports.Connect = Connect;
//# sourceMappingURL=connect.js.map