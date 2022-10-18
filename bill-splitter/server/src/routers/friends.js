const express = require('express')
const Group = require('../models/group')
const Bill = require('../models/bill')
const User = require('../models/user')
const router = new express.Router()
const passport = require('passport');

router.post('/addfriend',passport.authenticate('jwt', { session: false }), function(req, res, next){
   
    let user = req.user;
    
 User.findOneAndUpdate({ _id: user._id }, {$push: {friends:req.body.friend_id}}, async function(error, success){
     if (error) {
         console.log(error);
     } else {
         console.log(success);
     }
 
     user =await User.findById(user._id).populate({
         path: 'friends',
         model: 'User'
     });
 let friends = user.friends;
 
 friends = friends.map(f=>(
    { id: f._id,
      name:f.name}
 ))

 console.log(friends)
 
 res.json({friends: friends})
 })});
 
 router.get('/friends',passport.authenticate('jwt', { session: false }), async function(req, res, next){
     let user = req.user;
 
      user =await User.findById(user._id).populate({
         path: 'friends',
         model: 'User'
     });
 let friends = user.friends;
 
 friends = friends.map(f=>(
    { id: f._id,
      name:f.name}
 ))
 
 res.json({friends: friends})
 });
 
 router.get('/allusers',passport.authenticate('jwt', { session: false }), async function(req, res, next){
 const user = req.user
 let users = await User.find();
 
 users = users.map(u=>(
     {
         id: u._id,
         name:u.name
     }))

     const friends = user.friends;
     friends.push(user._id)
 
     friends.forEach(element => {
        users = users.filter(function(item) {
            return item.id.toString() !== element.toString()
        }) 
     });

    
     res.json({users: users})
 
 });

 module.exports = router;
 
