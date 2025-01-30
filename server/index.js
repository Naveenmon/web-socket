import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import paymentRoute from './routes/payment.route.js';


const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use("/api/auth", authRoute)
app.use("/api/order", paymentRoute)

const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})


io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Join a room (can be dynamic, such as using transaction ID or other context)
    socket.on('joinRoom', (roomId) => {
      socket.join(roomId);  // Add the user to the room
      console.log(`User joined room: ${roomId}`);
    });
  
    // Listen for payment completion and broadcast it to the room
    socket.on('paymentCompleted', (paymentData) => {
      const { roomId, amount, status, paymentId } = paymentData;
      
      // Broadcast to all users in the room
      io.to(roomId).emit('paymentStatus', {
        message: `Payment of $${amount} has been ${status}. Payment ID: ${paymentId}`,
        status,
        paymentId
      });
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });

server.listen(3001, () => {
    console.log("Server is running")
})

