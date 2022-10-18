import { useDispatch, useSelector } from "react-redux";
import { billAction } from "../../slices/bill-splitter";
import { Card } from "../UI/Card";


function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

function stringAvatar(name) {
  let children = `${name.toUpperCase().substring(0,2)}`
if (name.indexOf(' ')>=0){
  children = `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`
}
  
    return children;
  }
export function Friends(props){
const dispatch = useDispatch();
const token = useSelector(state=>state.auth.token)
    const color =stringToColor(props.friend.name)
    const userId = props.friend.id
    function addFriendHandler(){
dispatch(billAction.addFriend({token,userId}));
    }

    return(
    <Card className="friend-item">
            <div style={{backgroundColor: color}} className="avatar">
    <div className="avatar__letters">
      {stringAvatar(props.friend.name)}
    </div>
            </div>
            <div className="friends-list">
               {props.friend.name} 
            </div>
            {props.addFriend && <div onClick={addFriendHandler} className="friends-list-add">+</div>}
            </Card>
    )
}