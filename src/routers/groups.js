const express = require('express')
const Group = require('../models/group')
const User = require('../models/user')
const router = new express.Router()
const passport = require('passport');
const { findOne, findById } = require('../models/user');

router.post('/creategroup', passport.authenticate('jwt', { session: false }), async function(req, res, next){
    let user = req.user;
    const members = req.body.members;
    members.push(user._id.toString())
    const group = new Group({
        name: req.body.name,
        createdBy:user._id,
        members: members
    });

group.save();

console.log(members)
console.log(req.body.members)
// user.update({$push: {groups:group._id}})
members.forEach(memberID => {
    User.findOneAndUpdate({ _id: memberID }, {$push: {groups:group._id}}, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    })
        
});

user =await User.findById(user._id).populate({
    path: 'groups',
    model: 'Group',
    select: '_id name'
});
    try{
await group.save();
let groups = user.groups;
console.log(groups)
groups = groups.map(g=>(
   { id: g._id,
     name:g.name}
))
res.json({groups: groups})
    } catch(err){
        res.json({err: err})
    }

})
router.get('/groups', passport.authenticate('jwt', { session: false }), async function(req, res, next){
    let user = req.user;

    user =await User.findById(user._id).populate({
        path: 'groups',
        model: 'Group',
        strictPopulate: false,
        select: '_id name'
    });
let groups = user.groups;

groups = groups.map(g=>(
   { id: g._id,
     name:g.name}
))

res.json({
    groups: groups
})

});

router.post('/members', passport.authenticate('jwt', { session: false }), async function(req, res, next){
  const  group =await Group.findById(req.body.groupid).populate({
        path: 'members',
        model: 'User'
    });
let members = group.members;

members = members.map(m=>( 
    {id: m._id,
     name:m.name}))
     
     members.pop()

res.json({
    members: members // Last element is the user and we dont need it in the app.
})

});


module.exports = router;