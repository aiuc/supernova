const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const userRoute = require("./routes/users.js");
const authRoute = require("./routes/auth.js");
const postRoute = require("./routes/posts.js");

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Supernova Server.');
    });

app.listen(3000, () => {
    console.log('Server is running on Supernova Server');
    });

mongoose.connect('mongodb+srv://supernova_admin:technoduweb11@supernova.zuf8o3e.mongodb.net/supernova', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
