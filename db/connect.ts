let config = require("../config");
import {connect, connection} from 'mongoose';

export class Connect{

    mongoHost:string;
    mongoPort:string;
    monogoMainDb:string;
    db:any;

    constructor(){
        this.mongoHost  = config.database.host;
        this.mongoPort = config.database.port;
        this.monogoMainDb = config.database.mainDb;
    }

    public async mongooseConnect(){
        try{
            let con:any = await  connect(`mongodb://${this.mongoHost}:${this.mongoPort}/${this.monogoMainDb}`, {useNewUrlParser: true});
            this.db = con.connection;
            this.db.once('open', function callback() {
                console.log('Connection with database succeeded.');
            });
        }catch (e) {
            console.log(e)
        }


    }




}