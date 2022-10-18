
import { Card } from "../UI/Card"
import { BillSplitItem } from "./BillSplitItem"
import {useSelector} from 'react-redux'
// import {billAction} from '../../slices/bill-splitter'
import { useNavigate } from "react-router-dom"



export function HomePageHome(){
    console.log("Home Page Home")
    const navigate = useNavigate()
const bills = useSelector(state=>state.billsplitter.bills)
const activeGroupId = useSelector(state=>state.billsplitter.activeGroupId)
const user = useSelector(state=>state.auth.currentUser)
console.log(bills)
const renderBills = bills.map((bill)=>{
return <BillSplitItem bill = {bill}/>
})

function createBillSplitterHandler(){
    if(activeGroupId===''){
        alert('Inorder to create a Bill please select a group.')
        return;
    }
    navigate('/addbill');
}
    return(
        <div className="home-page-children flex-basis-40">
<Card>
    <div className="home-page-children-container">
     <div style={{padding: '20px'}}> Hello {user.name}</div>   
        <div className="btn-wrapper">
   <button onClick={createBillSplitterHandler} className="btn bill-splitter-btn">Create A Bill</button>
   <button onClick={()=>{navigate('/creategroup')}} className="btn bill-splitter-btn">Create A New Group</button>
   </div>
<div className="bill-split-container">
  {renderBills}
   </div>
    </div>  
</Card>
</div>
    )
}