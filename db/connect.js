"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
let config = require("../config");
const mongoose_1 = require("mongoose");
class Connect {
    constructor() {
        this.mongoHost = config.database.host;
        this.mongoPort = config.database.port;
        this.monogoMainDb = config.database.mainDb;
    }
    mongooseConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let con = yield mongoose_1.connect(`mongodb://${this.mongoHost}:${this.mongoPort}/${this.monogoMainDb}`, { useNewUrlParser: true });
                this.db = con.connection;
                this.db.once('open', function callback() {
                    console.log('Connection with database succeeded.');
                });
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.Connect = Connect;
//# sourceMappingURL=connect.js.map