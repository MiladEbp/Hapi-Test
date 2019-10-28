import {UserModel} from "../app/models/users";

let userModel:any = require('../app/models/users');
import {defer} from 'q';

export class  UsersBl{

    public async create(user:any){
        let deferred:any =  defer();
        try{
            let createUser:any = await UserModel.create(user);
            if(createUser){
                deferred.resolve({result:0});
            }else{
                deferred.resolve({result: -1})
            }
        }catch (e) {
            console.log(e);
            deferred.reject(e);
        }

        return deferred.promise;
    }
}