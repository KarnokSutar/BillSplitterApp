
import {useSelector} from 'react-redux'
// import {billAction} from '../../slices/bill-splitter'
import { Friends } from "./Friends";


export function HomePageProfileDetails(){
    console.log("Home Page Profile Details")
const friends = useSelector(state=> state.billsplitter.friends);
console.log(friends)
const renderFriends = friends.map((friend)=>{
    return <Friends friend = {friend} addFriend ={false}/>
})
    return(
        <div style={{paddingTop:'5rem'}} className="home-page-children friends-list-home flex-basis-29">
            <div className='friends-list-home-span'>Friends</div>
    {renderFriends}
</div>
    )
}