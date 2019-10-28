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
const users_1 = require("../app/models/users");
let userModel = require('../app/models/users');
const q_1 = require("q");
class UsersBl {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let deferred = q_1.defer();
            try {
                let createUser = yield users_1.UserModel.create(user);
                if (createUser) {
                    deferred.resolve({ result: 0 });
                }
                else {
                    deferred.resolve({ result: -1 });
                }
            }
            catch (e) {
                console.log(e);
                deferred.reject(e);
            }
            return deferred.promise;
        });
    }
}
exports.UsersBl = UsersBl;
//# sourceMappingURL=users.js.map