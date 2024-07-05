import express from 'express';

const app = express();
const PORT = 3000;

import jwt from "jsonwebtoken";
//import  { auth } from "./middleware.js";
let USER_ID_COUNTER = 1;
const USERS = [];
const JWT_SECRET = "secret";
import bodyParser from "body-parser";
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var jsonParser = bodyParser.json();
import cors from "cors";
app.use(cors());
app.use(jsonParser);

app.post("/signup", (req, res) => {
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
  
  app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = USERS.find((x) => x.email === email);
  
    if (!user) {
      return res.status(403).json({ msg: "User not found" });
    }
  
    if (user.password !== password) {
      return res.status(403).json({ msg: "Incorrect password" });
    }
  
    const token = jwt.sign(
      {
        id: user.id,
      },
      JWT_SECRET
    );
  
    return res.json({ token });
  });
  
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
  