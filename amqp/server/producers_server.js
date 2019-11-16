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
const amqplib_1 = require("amqplib");
class ServerProducers {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let conn = yield amqplib_1.connect('amqp://localhost');
                let chanel = yield conn.createChannel();
                let queueName = "create_user";
                yield chanel.assertQueue(queueName, { durable: true });
                yield chanel.sendToQueue(queueName, new Buffer(JSON.stringify(data)));
                yield chanel.close();
                yield conn.close();
            }
            catch (e) {
                console.log(e);
            }
        });
    }
}
exports.ServerProducers = ServerProducers;
//# sourceMappingURL=producers_server.js.map