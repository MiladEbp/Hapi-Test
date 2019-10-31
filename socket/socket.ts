import {UserModel} from "../app/models/users";
import {UsersBl} from "../bl/users";

let _io: any;
let userId:any;
export function initSocket(io:any){
    _io = io;
    io.on('connection',  function (socket:any) {
        console.log("socket connected : " + socket.id);

        socket.on('Jon Client Room', async function (data:any) {
            userId = data.userId;
            let userBl:any = new UsersBl();
            let findUser:any = await userBl.getUserById(userId);
            if(findUser.result == 0){
                let userType:any = findUser.data.type;
                if(userType == "admin"){
                    console.log("user join Client room : "+ findUser.data._id.toString() + " * " +  findUser.data.name);
                    socket.join(findUser.data._id.toString());
                }else{
                    console.log("user can not join in this Room")
                }
            }else{
                console.log("user not found!");
            }
        })
    })
}

export class UserSocket{

    public async createUser(data:any){
        let userData:any = JSON.parse(data);
        _io.sockets.to(userId).emit("createUser", userData);
    }

}

