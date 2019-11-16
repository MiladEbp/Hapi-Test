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
const socket_1 = require("../../socket/socket");
let userSocket = new socket_1.UserSocket();
function UserConsumers() {
    return __awaiter(this, void 0, void 0, function* () {
        let conn = yield amqplib_1.connect('amqp://localhost');
        let chanel = yield conn.createChannel();
        let queueName = "create_user";
        yield chanel.assertQueue(queueName, { durable: true });
        yield chanel.consume(queueName, msg => {
            if (msg !== null) {
                let message = msg.content.toString();
                userSocket.createUser(message);
            }
        }, { noAck: true });
    });
}
exports.UserConsumers = UserConsumers;
//# sourceMappingURL=consumers_users.js.map