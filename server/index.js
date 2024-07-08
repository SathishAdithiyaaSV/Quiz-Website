// server.js
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './User.js'; // Assuming you have a User model defined
import bodyParser from 'body-parser';
import cors from 'cors';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

import authMiddleware from './middleware.js';

const app = express();
const port = 3000;

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

// Signup route
app.post('/signup', async (req, res) => {
    try {
        let user_username = await User.findOne({ username: req.body.username });
        let user_email = await User.findOne({ email: req.body.email });
        if (user_email) {
            return res.status(403).json({ message: 'User already exists, please log in' });
        }
        else if (user_username) {
            return res.status(403).json({ message: 'Username already exists, try using a different one' });
        }

        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = new User({ username, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


// Login route
app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Protected route example
app.get('/profile', authMiddleware, (req, res) => {
    res.json(req.user);
});

io.on('connection', (socket) => {
  console.log(socket);
});

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
