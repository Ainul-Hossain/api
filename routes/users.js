const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

// UPDATE
router.put('/:id', async (req, res) => {

    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });

            res.status(200).json(updatedUser);
        } catch (err) {
            console.log('Something wrong!');
        }
    } else {
        res.status(401).json('You can update only your account!');
    }

})

// DELETE
router.delete('/:id', async (req, res) => {

    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id);

            try {
                await Post.deleteMany({ username: user.username });  // a user deleted means all posts of user's also deleted

                await User.findByIdAndDelete(req.params.id);

                res.status(200).json('User has been deleted!');
            } catch (err) {
                console.log('Something wrong!');
            }

        } catch (err) {
            // res.status(404).json('User not found!');
            console.log("User not found!");
        }
    } else {
        res.status(401).json('You can delete only your account!');
    }

})

// GET
router.get('/:id', async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;

        res.status(200).json(others);
    }catch(err){
        // res.status(500).json(err);
        console.log('This err is: ', err);  // This line is for terminal
    }
})

module.exports = router;