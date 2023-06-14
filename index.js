const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const authRoute = require('./routes/auth.js');  // for register & login
const usersRoute = require('./routes/users.js');
const postsRoute = require('./routes/posts.js');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(console.log('connected'))
    .catch((err)=>console.log(err));

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);

app.listen('5000', () => {
    console.log('Backend is running...');
});