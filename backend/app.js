// server.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import authRoutes from './routes/authRoutes.js';
import { handleSocketConnection } from './sockets/socketHandler.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }
});


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

app.use('/api/auth', authRoutes);
//app.use('/api/rooms', roomsRoutes);

io.on('connection', handleSocketConnection);

export default server;
