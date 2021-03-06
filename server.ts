import {UserConsumers} from './amqp/users/consumers_users';
import {initSocket} from './socket/socket';

let Hapi:any = require("hapi");
const Inert = require('inert');
const Vision = require('vision');
const Joi = require('joi');
const HapiSwagger = require('hapi-swagger');
let config = require('./config');



let server = Hapi.server({
    host : config.server.host,
    port : config.server.port
});



let io:any = require('socket.io')(server.listener);

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

initSocket(io);
UserConsumers();

start();
