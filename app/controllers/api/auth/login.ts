import {UsersBl} from '../../../../bl/users';
import {ServerProducers} from '../../../../amqp/server/producers_server';

const Joi = require('joi');
exports.beginAuth = {
    description: 'Login api',
    auth: false,
    validate:{
        payload:{
            mobile: Joi.string().required(),
            name: Joi.string().required(),
            type: Joi.string().required()
        },
        failAction:(request:any, h:any, error:any )=>{
            return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
        }
    },// validate
    handler: async function(req:any , h:any){
        try{
            let payload:any = req.payload;
            let mobile:any = payload.mobile;
            let name:string = payload.name;
            let type:any = payload.type;
            let result:any;

            let serverProducers:any = new ServerProducers();
            let userBl:any = new UsersBl();
            let user:any = {
                name: name,
                mobile: mobile,
                type: type,
                state: "active"
            }

            let createUser:any = await userBl.create(user);

            if(createUser.result == 0){
                let userInfo:any = createUser.userData;
                let amqpData:any = {
                  message: "Create User SuccessFully!",
                  data: userInfo
                };
                serverProducers.createUser(amqpData);
                result = {result: 0, mobile: mobile};
            }else{
                result = {result: 0, mobile: mobile};
            }

            return h.response(result);

        }catch (e) {

        }

    },
    tags:['api']
}