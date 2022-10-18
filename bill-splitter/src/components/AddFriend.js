
import { useSelector, useDispatch } from "react-redux";
import { billAction } from "../slices/bill-splitter";
import { useRState } from "./hooks/user-state"
import { Friends } from "./Home/Friends";


export function AddFriend(){
    console.log('Add Friend')
const dispatch = useDispatch();
    const {value: searchText, setValue: setSearchText} = useRState();
    const token = useSelector(state=>state.auth.token)
    const searchedUsers = useSelector(state=>state.billsplitter.searchedUsers)
    const renderSearchedUsers = searchedUsers.map((user)=>{
        return <Friends friend = {user} addFriend ={true}/>
})
    function searchHandler(){
dispatch(billAction.searchUser({searchText, token}))
    }
    function allUserHandler(){
dispatch(billAction.fetchAllUsers({token}))
    }
    return (
        <div className= "home-page-children flex-basis-40">
            <div  style={{marginBottom:'30px'}} className="add-friend-form">
            <input onChange={setSearchText} type='text' placeholder="Search a friend"></input>
            <button onClick={searchHandler} style={{padding:'15px', marginLeft:'10px'}} className="btn"> Search</button>
            <button onClick={allUserHandler} style={{padding:'15px', marginLeft:'10px'}} className="btn"> View All</button>
            </div>
            {renderSearchedUsers}
             </div>
    )
}