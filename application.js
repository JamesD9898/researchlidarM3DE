//express
import express from "express";
export {express} 
const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());

import cookieParser from "cookie-parser";
import bcrypt from 'bcrypt';

const PORT = 8100;

app.use(cookieParser());


const port = process.env.PORT || 4000;
function openport(){
  app.listen(port, () => {console.log(`Listening for requests on port ${port}...`);
  console.log("connected to MRLDB")
});
}
import userData from "./models/userdata.js";
import mongoose from 'mongoose';
const DBURI = 'mongodb+srv://DEPLOYMENT:WHKXqIVJELAuokNB@mrlwebcluster.a64pxx1.mongodb.net/';
mongoose.connect(DBURI)
.then((result) => openport())
.catch((err) =>  console.log(err));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
//const cookietemplate = `your_cookie_name=${cookieValue}; HttpOnly`;
let SID = 0

const loginfunc = async (req, res, userData, bcrypt) => {
    const { username, password } = req.body;
  
    try {
        const user = await userData.findOne({ $or: [{ username }, { email: username }] });
  
        if (!user) {
            res.status(404).json({ message: 'Username not found' });
            return;
        }
        if (await bcrypt.compare(password, user.password)) {
            SID = Math.random() * Math.pow(10, 32)
            //console.log(SID)
            user.sessionID = SID
            //console.log(user, user.sessionID)
            await user.save();
            res.cookie('sessionID', SID, { httpOnly: true });
            res.status(200).json({ message: 'Authentication successful', session: SID});
            //here
        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const signup = async (req, res, userData, app, bcrypt) => {
    const { email, username, password } = req.body; // Extract email from the request body

  try {
      const existingUser = await userData.findOne({ $or: [{ username }, { email }] });

      if (existingUser) {
          res.status(409).json({ message: 'Username or Email already exists' });
          return;
      }
      SID = Math.random() * Math.pow(10, 32)
      const salt = await bcrypt.genSalt()
      const hashedPassword = await bcrypt.hash(password, salt)
      //console.log(email, username, hashedPassword, SID)
      const newUser = new userData({ email: email, username: username, password: hashedPassword, sessionID: SID, xp: 0, tokens: 0, plays: 3, premium: false});
      await newUser.save();
      res.cookie('sessionID', SID, { httpOnly: true });
      res.status(201).json({ message: 'User created successfully', session: SID});
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
  }
}
const check = async (req, res, userData, app, cookieParser) => {
    let sessionID = null;
    //console.log("func.cookie")
    // Access the cookie value
    sessionID = req.cookies.sessionID;
    if (!sessionID){
        res.status(404).json({ message: 'No such cookie' });
        return;
    }
    //console.log('Value of session:', sessionID);
    try {
        const user = await userData.findOne({ sessionID });
  
        if (!user) {
            res.status(404).json({ message: 'Username not found' });
            return;
        } else {
            res.status(200).json({ message: 'User Authenticated', username: user.username})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
const signout = async (req, res) => {
    try {
        console.log("func.signout")
        res.clearCookie('sessionID'); 
        res.status(200).json({ message: 'Deleted HTTP Cookie' });

    } catch (error){
        console.error(error)
        res.status(500).json({ message: 'Internal server error' });
    }
}
app.post('/login', async (req, res) => {
    loginfunc(req, res, userData, bcrypt)
  });
  app.post('/signup', async (req, res) => {
    signup(req, res, userData, app, bcrypt)
  });
  app.get('/check', async(req, res) => {
    check(req, res, userData, app, cookieParser)
  })
  app.get('/signout', async(req, res) => {
    signout(req, res)
  })
