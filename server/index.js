// server.js
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './User.js'; // Assuming you have a User model defined
import bodyParser from 'body-parser';
import cors from 'cors';

import authMiddleware from './middleware.js';

const app = express();
const port = 3000;
const USERS = [];
let USER_ID_COUNTER = 1;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
  console.log(req.body)
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(403).json({ message: 'User already exists' });
        }

        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 5);
        user = new User({ name, email, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});


/*app.post("/signup", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  if (USERS.find((x) => x.email === email)) {
    return res.status(403).json({ msg: "Email already exists" });
  }

  USERS.push({
    email,
    password,
    id: USER_ID_COUNTER++,
  });

  return res.json({
    msg: "Success",
  });
});
*/
// Login route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
