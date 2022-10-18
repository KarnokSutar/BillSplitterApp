import { useDispatch, useSelector } from "react-redux"
import { billAction } from "../slices/bill-splitter";

export function GroupItem(props){
    const activeGroupId = useSelector(state=>state.billsplitter.activeGroupId)
const dispatch = useDispatch();

function changeGroupHandler(){
    dispatch(billAction.changeActiveGroup(props.group.id))
}
    function getClassName(){
        if (activeGroupId === props.group.id){
            return ("group-item-active")
        } else return ("group-item")
        }

        return(
            <div onClick={changeGroupHandler} className={getClassName()}>
        <div>{props.group.name}</div></div>
        )

}