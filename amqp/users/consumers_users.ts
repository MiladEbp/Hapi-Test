import {Channel, connect, Connection} from "amqplib";
import {UserSocket} from '../../socket/socket';

let userSocket:any = new UserSocket();
export async function UserConsumers(){
    let conn = await connect('amqp://localhost');
    let chanel:Channel = await conn.createChannel();

    let queueName:any = "create_user";

    /// Create Queue
    await chanel.assertQueue(queueName, {durable: true});

    /// Subscribe
    await chanel.consume(queueName, msg => {
        if (msg !== null) {
           let message:any =  msg.content.toString();
           userSocket.createUser(message);
        }
    },{noAck: true});

}