const express = require('express')
const Group = require('../models/group')
const User = require('../models/user')
const router = new express.Router()
const passport = require('passport');
const { findOne, findById } = require('../models/user');

router.post('/dboard', passport.authenticate('jwt', { session: false }), async function(req, res, next){
const user = req.user;

const userM =await User.findById(user._id).populate({
    path: 'lent.user owed.user',
    model: 'User',
    select: 'name _id'
});
console.log(userM.lent)
// console.log(user.lent)
let lent = userM.lent.filter((u)=>{
    return u.group.toString()=== req.body.groupid
})
 lent = lent.reduce((a, c) => {
	let filtered = a.filter(el => el.user._id.toString() === c.user._id.toString());
    console.log(filtered)
	if(filtered.length > 0){
		a[a.indexOf(filtered[0])].amount += +c.amount;
	}else{
		a.push(c);
	}
	return a;
}, []);

let owed = userM.owed.filter((u)=>{
    return u.group.toString()=== req.body.groupid
})
 owed = owed.reduce((a, c) => {
	let filtered = a.filter(el => el.user._id.toString() === c.user._id.toString());
    console.log(filtered)
	if(filtered.length > 0){
		a[a.indexOf(filtered[0])].amount += +c.amount;
	}else{
		a.push(c);
	}
	return a;
}, []);

// lent = await lent.populate("userID");
res.json({lent: lent})
});

router.post('/db', passport.authenticate('jwt', { session: false }), async function(req, res, next){
    const user = req.user;

    const group =await Group.findById(req.body.groupid).populate({
        path: 'members',
        model: 'User'
    });

    const groupMembers = group.members;
    let ar = [];
    let db = []

groupMembers.forEach(element => {

let lentAmount = element.lent.filter((e)=>{
  return  e.group.toString() === req.body.groupid
})
    lentAmount= lentAmount.reduce((a,c)=>{
return a+ (+c.amount)
        }, 0);

        let owedAmount = element.owed.filter((e)=>{
            return  e.group.toString() === req.body.groupid
          })        
         owedAmount = owedAmount.reduce((a,c)=>{
    return a+ (+c.amount)
            }, 0);


            ar.push({id: element._id,
                name:element.name,
            balance: (lentAmount-owedAmount).toFixed(4)})
    });

    ar = ar.filter((a)=>{
        console.log(a.balance)
     return   a.balance !== '0.0000'  // removing the element where balance is Zero
})

    function sortByBalance(a,b) {
        return (parseInt(a.balance) < parseInt(b.balance)) ? -1 : 1; 
    }
    
    while(ar.length>0){
        ar.sort(sortByBalance);
        console.log(ar)
        const fElement = ar.shift();
        const lElement= ar.pop();

        console.log(fElement)
        console.log(lElement)
        balance = ((+ lElement.balance) + (+ fElement.balance )).toFixed(4)
        if(Math.abs(fElement.balance)>Math.abs(lElement.balance)){
            if (Math.abs(balance) <0.001){
                db.push({payeeid:lElement.id,
                    payeeName: lElement.name,
                    amount: lElement.balance,
                    payorName: fElement.name,
                   payorid:fElement.id})  
            } else{
db.push({payeeid:fElement.id,
    payeeName: fElement.name,
 amount: lElement.balance,
 payorName: lElement.name,
payorid:lElement.id})
ar.push({id: fElement.id,
    name:fElement.name,
balance:balance})}
        }
        if(Math.abs(fElement.balance)<Math.abs(lElement.balance)){
            if (Math.abs(balance) <0.001){
                db.push({payeeid:lElement.id,
                    payeeName: lElement.name,
                    amount: lElement.balance,
                    payorName: fElement.name,
                   payorid:fElement.id})  
            } else{
            db.push({payeeid:lElement.id,
                payeeName: lElement.name,
             amount: - fElement.balance,
             payorName: fElement.name,
            payorid:fElement.id})
            ar.push({id: lElement.id,
                name:lElement.name,
            balance: balance}) }
                    }

                    if(Math.abs(fElement.balance)===Math.abs(lElement.balance)){
                        db.push({payeeid:lElement.id,
                            payeeName: lElement.name,
                            amount: lElement.balance,
                            payorName: fElement.name,
                           payorid:fElement.id})
                    }
                    
                   
           
    }
    res.json({db: db})
});


module.exports = router;
