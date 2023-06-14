const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

// CREATE
router.post('/', async (req, res) => {
    const newPost = new Post(req.body);

    try {
        const savedPost = await newPost.save();  // if user not in the database then not allowed to do post [it's also possible]

        res.status(200).json(savedPost);
    } catch (err) {
        // res.status(500).json(err);
        console.log('This err is: ', err);
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {
            try {

                const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                }, {new: true});

                res.status(200).json(updatedPost);

            } catch (err) {
                // res.status(500).json(err);
                console.log('Something wrong!');
            }
        } else {
            res.status(401).json('You can update only your post!');
        }
    } catch (err) {
        // res.status(500).json(err);
        console.log('This err is: ', err);
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (post.username === req.body.username) {
            try {
                await Post.findByIdAndDelete(req.params.id);  
                // await post.delete();  // direct delete the post (not working, don't know why) // this is also possible

                res.status(200).json('Post has been deleted!');
            } catch (err) {
                // res.status(500).json(err);
                console.log('Something wrong!');
            }
        } else {
            res.status(401).json('You can delete only your post!');
        }
    } catch (err) {
        // res.status(500).json(err);
        console.log('This err is: ', err);
    }
});

// GET
router.get('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        res.status(200).json(post);
    }catch(err){
        // res.status(500).json(err);
        console.log('This err is: ', err);
    }
});

// GET ALL POSTS
router.get('/', async (req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;

    try{
        let posts;

        if(username){
            posts = await Post.find({username: username});
        } else if(catName){
            posts = await Post.find({categories: {  // is the catName(category name) there in the categories array? check.
                $in: [catName]
            }});
        } else {
            posts = await Post.find();
        }

        res.status(200).json(posts);
    }catch(err){
        // res.status(500).json(err);
        console.log('This err is: ', err);
    }
});

module.exports = router;