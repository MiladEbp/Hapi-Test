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
const users_1 = require("../bl/users");
let _io;
let userId;
function initSocket(io) {
    _io = io;
    io.on('connection', function (socket) {
        console.log("socket connected : " + socket.id);
        socket.on('Jon Client Room', function (data) {
            return __awaiter(this, void 0, void 0, function* () {
                userId = data.userId;
                let userBl = new users_1.UsersBl();
                let findUser = yield userBl.getUserById(userId);
                if (findUser.result == 0) {
                    let userType = findUser.data.type;
                    if (userType == "admin") {
                        console.log("user join Client room : " + findUser.data._id.toString() + " * " + findUser.data.name);
                        socket.join(findUser.data._id.toString());
                    }
                    else {
                        console.log("user can not join in this Room");
                    }
                }
                else {
                    console.log("user not found!");
                }
            });
        });
    });
}
exports.initSocket = initSocket;
class UserSocket {
    createUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let userData = JSON.parse(data);
            _io.sockets.to(userId).emit("createUser", userData);
        });
    }
}
exports.UserSocket = UserSocket;
//# sourceMappingURL=socket.js.map