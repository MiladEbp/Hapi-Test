import {Document, Schema, model} from "mongoose";
import {Connect} from '../../db/connect';

let database:any = new Connect();
let connection:any = database.mongooseConnect();

interface IUerModel extends Document{
    mobile: string;
    name: string;
    createdAt: Date;
    modifiedAt: Date;
}

export let UserSchema = new Schema({
    mobile:{type: String},
    name: {type: String},
    createdAt: {
        type: Date,
        required: false
    },
    modifiedAt: {
        type: Date,
        required: false
    }
}, {
    timestamps: { createdAt: 'createdAt' , updatedAt : "modifiedAt" }
});

export let UserModel:any = connection.model('User', UserSchema, 'users', true);


UserModel.ensureIndexes((err:any)=> {
    if (err)
        console.log(err);
    // else
    //     console.log('create user index successfully');
});
