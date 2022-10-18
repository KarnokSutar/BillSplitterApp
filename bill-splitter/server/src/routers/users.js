const express = require('express')
const User = require('../models/user')
const router = new express.Router()
const passport = require('passport');
const utils = require('../lib/utils');

// router.post('/user', async (req, res) => {

//     const user = new User(req.body)
// console.log(user);
//     try {
       
//         await user.save()
//         res.status(201).json({user: user})
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.get('/pr', passport.authenticate('jwt', { session: false }), (req, res, next) => {

    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!", 
user: req.user});
});


// Validate an existing user and issue a JWT
router.post('/login', function(req, res, next){

    User.findOne({ email: req.body.email })
        .then((user) => {

            if (!user) {
                return res.status(401).json({ success: false, msg: "could not find user" });
            }
            
            // Function defined at bottom of app.js
            const isValid = utils.validPassword(req.body.password, user.hash, user.salt);
            
            if (isValid) {

                const tokenObject = utils.issueJWT(user);

                res.status(200).json({ success: true, user:user, token: tokenObject.token, expiresIn: tokenObject.expires });

            } else {

                res.status(401).json({ success: false, msg: "you entered the wrong password" });

            }

        })
        .catch((err) => {
            next(err);
        });
});

// Register a new user
router.post('/register', async function(req, res, next){
    const saltHash = utils.genPassword(req.body.password);
    
    const salt = saltHash.salt;
    const hash = saltHash.hash;
console.log(saltHash)
    const newUser = new User({
        name: req.body.name,
        email:req.body.email,
        hash: hash,
        salt: salt,
        age:req.body.age,
    });

    try {
    
      await  newUser.save();
            const tokenObject = utils.issueJWT(newUser);
            res.json({ success: true, user: newUser, token: tokenObject.token, expiresIn: tokenObject.expires });

    } catch (err) {
        console.log(err)
        res.json({ success: false, msg: err.message });

    }

});

module.exports = router;