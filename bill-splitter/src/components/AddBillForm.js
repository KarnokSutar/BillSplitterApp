import { useState } from "react"
import { FriendsInAddBillForm } from "./FriendsInAddBillForm"
import { useSelector } from "react-redux"
import { useRState } from "./hooks/user-state"
import {useDispatch} from 'react-redux'
import { billAction } from "../slices/bill-splitter"
import { useNavigate } from "react-router-dom"

// const FRIENDS = [{name:'Karnok'}, {name:'Kanti'}, {name:'Sutar'}]

export function AddBillForm(){
const dispatch = useDispatch();
const navigate = useNavigate();
    const[selectedFriends, setSelectedFriends]= useState([])
    const{value: title, setValue: setTitle} = useRState();
    const{value: amount, setValue: setAmount} = useRState();

    function arrayRemove(arr, value) {
 
        return arr.filter(function(geeks){
            return geeks !== value;
        });}

function onChange(e){
    let friends = selectedFriends;
    const {value, checked} = e.target;
    if(checked){
        friends.push(value);
        setSelectedFriends(friends)
        console.log(friends)
    }else{
        friends = arrayRemove(friends, value)
        setSelectedFriends(friends);
        console.log(friends)
    }
}
const token = useSelector(state=>state.auth.token)
const activeGroupId = useSelector(state=>state.billsplitter.activeGroupId)


    function addBillHandler(event){
        event.preventDefault();
        const amountNumber = +amount;
        const totalNumberofsplits = selectedFriends.length+1;
console.log(amountNumber)
const averageAmount = amountNumber/totalNumberofsplits;
console.log(averageAmount)
const friendsId= selectedFriends.map((str)=>{
    return (str)
})
dispatch(billAction.createNewBill({friendsId, title, amountNumber, averageAmount, token,activeGroupId}))
navigate('/home')
    }
const members = useSelector(state=>state.billsplitter.members)
    const renderMembers = members.map((member)=>{
       return <FriendsInAddBillForm member = {member}  onChange = {onChange}/>
    })

    return (
        <form onSubmit={addBillHandler} className="home-page-children flex-basis-40">
         <div className="add-bill-form-border ">
          <div className="add-bill-form-container-form">
          <input onChange={setTitle} min="0" type="text" placeholder="Title..."/>
         <input onChange={setAmount} type="number" placeholder="00.00"/>
         <p> Members you want to add in your bill: </p>
         </div> 
         <div className="add-bill-form-friends">
             {renderMembers}
          </div>
          <div className="add-bill-form-btn-container">
          <button type="submit" className="btn">Add Bill</button> </div>
         </div>
        </form>
    )
}