let hapi:any = require("hapi");
const Inert = require('inert');
const Vision = require('vision');
const Joi = require('joi');
const HapiSwagger = require('hapi-swagger');

let server = hapi.server({
    host :'localhost' ,
    port :'8000'
});

const options = {
    info: {
        'title': 'Test API Documentation',
        'version': '0.0.1',
    }
};



async function start(){
    try{
        await server.register([
                Inert,
                Vision,
                {
                    plugin: HapiSwagger,
                    options: options
                },
                {
                    plugin:require('./app/routes/auth')
                }

            ]
        );
        await server.start();
    }catch (e) {
        console.log(e);
    }

    console.log('Server running at : ', server.info.uri);
}

start();
