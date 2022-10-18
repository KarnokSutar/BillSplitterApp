const express = require('express')
const Group = require('../models/group')
const Bill = require('../models/bill')
const User = require('../models/user')
const router = new express.Router()
const passport = require('passport');
const { findOne, findById } = require('../models/user');


async function getLentOwed(user, groupid){
    const userM =await User.findById(user._id).populate({
        path: 'lent.user owed.user',
        model: 'User',
        select: 'name _id'
    });
   
    let lent = userM.lent.filter((u)=>{
        return u.group.toString()=== groupid
    })
     lent = lent.reduce((a, c) => {
        let filtered = a.filter(el => el.user._id.toString() === c.user._id.toString());
        if(filtered.length > 0){
            a[a.indexOf(filtered[0])].amount += +c.amount;
        }else{
            a.push(c);
        }
        return a;
    }, []);
    
    let owed = userM.owed.filter((u)=>{
        return u.group.toString()=== groupid
    })
     owed = owed.reduce((a, c) => {
        let filtered = a.filter(el => el.user._id.toString() === c.user._id.toString());
        if(filtered.length > 0){
            a[a.indexOf(filtered[0])].amount += +c.amount;
        }else{
            a.push(c);
        }
        return a;
    }, []);
return {lent , owed}
}

router.post('/createbill', passport.authenticate('jwt', { session: false }), async function(req, res, next){
    const user = req.user;
    const debtors = req.body.debtors;
    let bill = new Bill({
        title: req.body.title,
        createdBy:user._id,
        group:req.body.groupid,      
        tAmount: req.body.tamount,
        pPAmount:req.body.ppamount,
        debtors: debtors,
    });

bill.save();


debtors.forEach(debtorID => {
    User.findOneAndUpdate({ _id: debtorID }, {$push: {owed:{user: user._id,billID: bill._id, group:req.body.groupid,amount:req.body.ppamount}}}, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    })
    // user.update({$push: {owed:{userID: debtorID, amount:req.body.ppamount}}})
    User.findOneAndUpdate({ _id: user._id }, {$push: {lent:{user: debtorID, billID: bill._id, group:req.body.groupid, amount:req.body.ppamount}}}, function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log(success);
        }
    })
        
});
bill = await Bill.find({
    'group': req.body.groupid
}).populate({
    path:"debtors createdBy",
    model:'User',
    select:
    'name _id'
});

const {lent , owed}= await getLentOwed(user, req.body.groupid)
res.json({bill: bill,
    lent: lent, owed: owed}) 

})


router.post('/bills', passport.authenticate('jwt', { session: false }), async function(req, res, next){
    const user = req.user;

    let bill = await Bill.find({
        'group': req.body.groupid
    }).populate({
        path:"debtors createdBy",
        model:'User',
        select:
        'name _id'
    });
    const  {lent , owed} =await getLentOwed(user, req.body.groupid)
console.log(lent)
    res.json({bill: bill,
    lent: lent, owed: owed})



})

module.exports = router;