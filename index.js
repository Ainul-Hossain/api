const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const multer = require('multer');

const authRoute = require('./routes/auth.js');  // for register & login
const usersRoute = require('./routes/users.js');
const postsRoute = require('./routes/posts.js');
const categoriesRoute = require('./routes/categories.js');

dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(console.log('connected'))
    .catch((err)=>console.log(err));

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, 'images');
    }, 

    filename: (req, file, cb)=>{
        cb(null, 'hello.jpg');
    }
});

const upload = multer({storage: storage});
app.post('/api/upload', upload.single('file'), (req, res)=>{
    res.status(200).json('File has been uploaded!');
})

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/categories', categoriesRoute);

app.listen('5000', () => {
    console.log('Backend is running...');
});