import { useState } from "react";
import { useSelector } from "react-redux"
import Modal from "./Modal";

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

export function Dashboard(){
    console.log('dashboard')

const owed = useSelector(state=>state.billsplitter.owed)
const lent = useSelector(state=>state.billsplitter.lent)
const totalOwedAmount = useSelector(state=>state.billsplitter.totalOwedAmount)
const totalLoanedAmount = useSelector(state=>state.billsplitter.totalLoanedAmount)
const transactions = useSelector(state=>state.billsplitter.transactions)
const[modal, setModal] = useState(false)

 const renderOwedFriend = lent.map((l)=>{
    return  <tr>
    <td>{l.user.name}</td>
    <td>{formatter.format(l.amount)}</td>
  </tr>
 } )
 const renderTransactions =
transactions.map((t)=>{
  console.log(t)
  return <tr>
    <td>{t.payorName}</td>
    <td>{t.payeeName}</td>
    <td>{formatter.format(t.amount)}</td>
  </tr>
})


 const renderCreditorFriend = owed.map((o)=>{

    return <tr>
    <td>{o.user.name}</td>
    <td>{formatter.format(o.amount)}</td>
  </tr>
 } )
    return(
      
      <>
      {modal && <Modal>
        <table style={{width:'100%', marginTop: '20px'}}>
  <thead>
<tr>
  <th>Payor</th>
  <th>Payee</th>
  <th>Amount</th>
</tr> </thead>
<tbody>
{renderTransactions}
</tbody>
</table>
<div style={{marginTop:'30px'}} >
        <button  className="btn"  style={{margin:'auto'}} onClick={()=>{
        setModal(false)
      }}>Close</button></div></Modal>}
        <div className="home-page-children flex-basis-40">
            <div className="dashboard-container dashboard-summary">
<div className="dashboard-children-container ">
You Owed: {formatter.format(+totalOwedAmount) }
</div>
<div className="dashboard-children-container" >
You Lent: {formatter.format(+totalLoanedAmount)}
</div>
            </div>

       {(owed.length!==0 ||lent.length !==0) && <div><button onClick={()=>{
        setModal(true)
      }} className="btn" style={{width:'100%' ,margin:'auto'}}>Click here to find the minimum transactions required to settle all the bills.</button></div>}     
            <div className="dashboard-container">
           <div className="dashboard-children-container">
Friends whom you will pay:
{(owed.length===0) ? <p className="dashboard-children-container-message">It seems you are <br/> owed to NONE.</p>
: <table style={{width:'100%', marginTop: '20px'}}>
  <thead>
<tr>
  <th>Your Friend</th>
  <th>Amount</th>
</tr> </thead>
<tbody>
{renderCreditorFriend}
</tbody>
</table>}

           </div>
           <div className="dashboard-children-container">
            Friends who will pay you:
            {(lent.length===0) ? <p className="dashboard-children-container-message">It seems none of your Friend is owed to You.</p>
            : <table style={{width:'100%', marginTop: '20px'}}>
            <tr>
              <th>Your Friend</th>
              <th>Amount</th>
            </tr>
           {renderOwedFriend}
          </table>}
           </div>
           </div>
        </div>
        </>
    )
}