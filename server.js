import './config.js'
import app from "./app.js";
import mongoose from 'mongoose'
import WebSocket , {WebSocketServer} from 'ws'
import http from 'http'
import { v4 as uuidv4 } from 'uuid';
import url from 'url';


const port = process.env.PORT || 3000
const dbConnection = process.env.DATABASE_CONNECTION_STRING.replace('<password>' , process.env.PASSWORD)

mongoose.connect(dbConnection).then(conn => {
    console.log(conn.connection , 'Connection established');
})

// app.listen( port , ()=>{
//     console.log(`Listning to  ${port}..`);
// })

const server = http.createServer(app)

const wss = new WebSocketServer({server})
wss.on('connection' , function(ws, req){
    ws.id = uuidv4();
    console.log('socket Open ' , url.parse(req.url , true ).query['key']);
    const parameters = url.parse(req.url , true ).query
    if(parameters?.chatroom !== undefined){
        ws.chatroom = parameters.chatroom
    }
    ws.on('message' , function(data , isBinary){
        let chatroomActive = false 
        if(ws.chatroom !== undefined){
            chatroomActive = true
        }
       wss.clients.forEach(function(client){

        if(client!== ws && client.readyState === WebSocket.OPEN){
            if(chatroomActive === false)
                client.send(data , {binary:isBinary})
            else{
                if(ws.chatroom === client.chatroom){
                    client.send(data , {binary:isBinary})
                }
            }
        }
       })
    })
})

server.listen(port, ()=>console.log('Listining to the port'))