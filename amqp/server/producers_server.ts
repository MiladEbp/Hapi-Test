import {Channel, connect, Connection} from "amqplib";

export class ServerProducers{

    public async createUser(data:any){
        try{
            let conn:Connection = await connect('amqp://localhost');
            let chanel:Channel = await conn.createChannel();
            let queueName:any = "create_user";

            /// Create Queue
            await chanel.assertQueue(queueName, {durable: true});

            /// Publish in Queue
            await  chanel.sendToQueue(queueName, new Buffer(JSON.stringify(data)));
            await chanel.close();
            await conn.close();

        }catch (e) {
            console.log(e)
        }
    }// createUser



}