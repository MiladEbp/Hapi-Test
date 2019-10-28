import {UsersBl} from '../../../../bl/users';


const Joi = require('joi');
exports.beginAuth = {
    description: 'Login api',
    auth: false,
    validate:{
        payload:{
            mobile: Joi.string().required(),
            name: Joi.string().required()
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

            let userBl:any = new UsersBl();
            let user:any = {
                name: name,
                mobile: mobile
            }

            let createUser:any = await userBl.create(user);

            if(createUser.result == 0){
                return h.response({result: 0, mobile: mobile});
            }else{
                return h.response({result: -1, message: 'خطایی رخ داده است!'});
            }



        }catch (e) {

        }

    },
    tags:['api']
}