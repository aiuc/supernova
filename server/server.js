const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Supernova Server.');
    });

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
    });

mongoose.connect('mongodb://127.0.0.1:27017/supernova', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

// --------
// DATABASE
// --------
// User register
const User = mongoose.model('User', {
    name: String,
    username: String,
    email: String,
    password: String
});

const Post = mongoose.model('Post', {
    input: String
});



app.post('/api/register', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
    }
    // Get user data from request body
    const {name, username, email, password } = req.body;
  
    // Create a new User object
    const newUser = new User({name, username, email, password });
  
    // Save the user to the database
    newUser.save()
      .then(() => {
        res.status(201).json({ message: 'User registered successfully' });
      })
      .catch((err) => {
        console.error('Failed to register user', err);
        res.status(500).json({ message: 'Failed to register user' });
      });
  });

  app.post('/api/post', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ error: 'Request body is missing' });
    }

    const {input } = req.body;
    const newPost = new Post({input });

    newPost.save()
      .then(() => {
        res.status(201).json({ message: 'Post made successfully' });
      })
      .catch((err) => {
        console.error('Failed to make Post', err);
        res.status(500).json({ message: 'Failed to make Post' });
      });
  });

