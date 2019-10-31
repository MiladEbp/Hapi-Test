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
const users_1 = require("../../../../bl/users");
const producers_server_1 = require("../../../../amqp/server/producers_server");
const Joi = require('joi');
exports.beginAuth = {
    description: 'Login api',
    auth: false,
    validate: {
        payload: {
            mobile: Joi.string().required(),
            name: Joi.string().required(),
            type: Joi.string().required()
        },
        failAction: (request, h, error) => {
            return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
        }
    },
    handler: function (req, h) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let payload = req.payload;
                let mobile = payload.mobile;
                let name = payload.name;
                let type = payload.type;
                let result;
                let serverProducers = new producers_server_1.ServerProducers();
                let userBl = new users_1.UsersBl();
                let user = {
                    name: name,
                    mobile: mobile,
                    type: type,
                    state: "active"
                };
                let createUser = yield userBl.create(user);
                if (createUser.result == 0) {
                    let userInfo = createUser.userData;
                    let amqpData = {
                        message: "Create User SuccessFully!",
                        data: userInfo
                    };
                    serverProducers.createUser(amqpData);
                    result = { result: 0, mobile: mobile };
                }
                else {
                    result = { result: 0, mobile: mobile };
                }
                return h.response(result);
            }
            catch (e) {
            }
        });
    },
    tags: ['api']
};
//# sourceMappingURL=login.js.map