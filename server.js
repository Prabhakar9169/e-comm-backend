import './config.js'
import app from "./app.js";
import mongoose from 'mongoose'
import WebSocket , {WebSocketServer} from 'ws'
import http from 'http'


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
wss.on('connection' , function(ws){
    console.log('socket Open');
    ws.on('message' , function(data , isBinary){
       wss.clients.forEach(function(client){
        if(client!== ws && client.readyState === WebSocket.OPEN){
            client.send(data , {binary:isBinary})
        }
       })
    })
})

server.listen(port, ()=>console.log('Listining to the port'))