import {Connect} from "./db/connect";

let hapi:any = require("hapi");
const Inert = require('inert');
const Vision = require('vision');
const Joi = require('joi');
const HapiSwagger = require('hapi-swagger');
let config = require('./config');

let server = hapi.server({
    host : config.server.host,
    port : config.server.port
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
