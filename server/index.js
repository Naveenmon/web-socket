import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import authRoute from './routes/auth.route.js';
import paymentRoute from './routes/payment.route.js';
import transactionRoute from './routes/transaction.route.js';


const app = express();
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use("/api/auth", authRoute)
app.use("/api/order", paymentRoute)
app.use("/api/transaction", transactionRoute)

const server = http.createServer(app)

const io = new Server(server, {
    cors : {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('newMessage', (message) => {
    io.emit('newMessage', message);
});

  socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
  });
});



server.listen(3001, () => {
    console.log("Server is running")
})

