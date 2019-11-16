let config = require("../config");
var mongoose = require("mongoose");
import q = require("q");

let conn:any;
export class Connect{

    mongoHost:string;
    mongoPort:string;
    monogoMainDb:string;

    constructor(){
        this.mongoHost  = config.database.host;
        this.mongoPort = config.database.port;
        this.monogoMainDb = config.database.mainDb;
    }

    public createConnection(){

        try{
            mongoose.Promise = q.Promise;
            conn = mongoose.createConnection(`mongodb://${this.mongoHost}:${this.mongoPort}/${this.monogoMainDb}`, {useNewUrlParser: true});
        }catch (e) {
            console.log(e)
        }
        return conn;


    }




}