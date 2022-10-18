
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useRState } from "./hooks/user-state";
import { billAction } from "../slices/bill-splitter";
import { useNavigate } from "react-router-dom";
import { FriendsinCreateNewGroup } from "./FriendsInCreateNewGroup";


function arrayRemove(arr, value) {
 
    return arr.filter(function(geeks){
        return geeks !== value;
    });}

export function CreateGroupForm(){
    const[selectedFriends, setSelectedFriends] = useState([])
    const{value: title, setValue: setTitle} = useRState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const friends = useSelector(state=>state.billsplitter.friends);
    const token = useSelector(state=>state.auth.token);
    const renderFriends = friends.map((friend)=>{
       return <FriendsinCreateNewGroup friend = {friend}  onChange = {onChange}/>
    })

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
    function createGroupHandler(){
        const friendsId= selectedFriends.map((str)=>{
            console.log(str)
            return (str)
        })
        dispatch(billAction.createGroup({friendsId, title, token}))
        navigate('/home')
    }

    return(
        <div className="home-page-children flex-basis-40 ">
             <form onSubmit={createGroupHandler} className="home-page-children flex-basis-40"  style={{marginTop:'4rem'}}>
         <div className="add-bill-form-border " style={{marginTop:'-50px'}}>
          <div className="add-bill-form-container-form">
          <input onChange={setTitle} min="0" type="text" placeholder="Title..."/>
          <p> Friends you want to add in your GROUP: </p>
         </div> 

         <div className="add-bill-form-friends">
           
             {renderFriends}
          </div>
          <div className="add-bill-form-btn-container">
          <button type="submit" className="btn">Submit</button> </div>
         </div>
        </form>
        </div>
    )
}