import { Card } from "./UI/Card";


export function FriendsinCreateNewGroup(props){
    return (
        <Card className="friend-item-in-form">
        <input type='checkbox' onChange={(e)=>props.onChange(e)} value={props.friend.id}></input>
        <label>{props.friend.name}</label>
        <br/>
        </Card>
    )
}