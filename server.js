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
const consumers_users_1 = require("./amqp/users/consumers_users");
const socket_1 = require("./socket/socket");
let Hapi = require("hapi");
const Inert = require('inert');
const Vision = require('vision');
const Joi = require('joi');
const HapiSwagger = require('hapi-swagger');
let config = require('./config');
let server = Hapi.server({
    host: config.server.host,
    port: config.server.port
});
let io = require('socket.io')(server.listener);
const options = {
    info: {
        'title': 'Test API Documentation',
        'version': '0.0.1',
    }
};
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield server.register([
                Inert,
                Vision,
                {
                    plugin: HapiSwagger,
                    options: options
                },
                {
                    plugin: require('./app/routes/auth')
                }
            ]);
            yield server.start();
        }
        catch (e) {
            console.log(e);
        }
        console.log('Server running at : ', server.info.uri);
    });
}
socket_1.initSocket(io);
consumers_users_1.UserConsumers();
start();
//# sourceMappingURL=server.js.map