import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import authRoute from './routes/auth.route.js';


const app = express();
app.use(cors());
app.use(express.json())

app.use("/api/auth", authRoute)

const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})


io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("send_message", (data) => {
        console.log("Message received: ", data);
        socket.broadcast.emit("received_message", data)
    });


    
    socket.on("disconnect", () => {
        console.log(`User Disconnected: ${socket.id}`);
    });
});

server.listen(3001, () => {
    console.log("Server is running")
})

