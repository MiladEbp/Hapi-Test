"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connect_1 = require("../../db/connect");
var mongoose = require("mongoose");
let database = new connect_1.Connect();
let connection = database.createConnection();
exports.UserSchema = new mongoose_1.Schema({
    mobile: { type: String },
    name: { type: String },
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: "modifiedAt" }
});
exports.UserModel = connection.model('User', exports.UserSchema, 'users', true);
exports.UserModel.ensureIndexes((err) => {
    if (err)
        console.log(err);
});
//# sourceMappingURL=users.js.map