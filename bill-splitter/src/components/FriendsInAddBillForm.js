import { Card } from "./UI/Card";


export function FriendsInAddBillForm(props){
    return (
        <Card className="friend-item-in-form">
        <input type='checkbox' onChange={(e)=>props.onChange(e)} value={props.member.id}></input>
        <label>{props.member.name}</label>
        <br/>
        </Card>
    )
}