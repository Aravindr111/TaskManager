const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const user =require('../models/user')
const eventsRoutes = require('../src/api/events');
const cityRoutes = require('../src/api/Cities');
const sportRoutes = require('../src/api/Sports');
const userRoutes = require('../src/api/Users');


const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/sportsapp')
.then(()=>{
    console.log("database connected")
})
.catch(()=>{
    console.log("failed to connect");
})

app.post('/Signup', async (req, res) => {
    try {
      const data = {
        name: req.body.name,
        password: req.body.password,
      };
      await user.insertMany([data]);
      res.status(200).send('Signup successful');
    } catch (error) {
      console.error('Error during signup:',error);
      res.status(500).send('An error occurred during signup.');
    }
  });

  app.post('/Login', async (req, res) => {
    try {
      const check = await user.findOne({ name: req.body.name });
      if (check && check.password === req.body.password) {
        res.status(200).send('Login successful');
      } else {
        res.status(401).send('Incorrect name or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).send('An error occurred during login.');
    }
  });

  app.use('/api/events', eventsRoutes);
  app.use('/api/Cities', cityRoutes);
  app.use('/api/Sports', sportRoutes );
  app.use('/api/Users', userRoutes );
app.listen(3000,() => {
    console.log('Server running on port 3000');
  });

