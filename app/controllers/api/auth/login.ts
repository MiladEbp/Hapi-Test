
const Joi = require('joi');
exports.beginAuth = {
    description: 'Login api',
    auth: false,
    validate:{
        payload:{
            mobile: Joi.string().required()
        },
        failAction:(request:any, h:any, error:any )=>{
            return h.response({ message: error.details[0].message.replace(/['"]+/g, '') }).code(400).takeover();
        }
    },// validate
    handler: async function(req:any , h:any){
        let payload:any = req.payload;
        let mobile:any = payload.mobile;


        return h.response({result: 0, mobile: mobile});
    },
    tags:['api']
}