import { useSelector } from "react-redux";

 


var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  
    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  const monthNames = ["JAN", "FEB", "MAR", "APR", "May", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

 export function BillSplitItem(props){

    const date = new Date(props.bill.createdAt);
   const name = props.bill.createdBy.name.split(' ');
   const user = useSelector(state=>state.auth.currentUser)
 
   if(user.id=== props.bill.user_id){
    name[0]= 'You';
   }

    return(
  
        <div className="bill-split-item-container">
            <div className="bill-created-by" style={{fontSize:'10px'}}><span>Created by :</span>
             {  ` ${name[0]}`}</div>
            <div className="bill-split-item-main-block">            
            <div className="date">
{monthNames[date.getMonth()]}
<div className="number">{date.getDate()}</div>
            </div>
            <div className="title">
{props.bill.title}
            </div>
            </div>

            <div  className="bill-split-item-you-amount">
            <div className="bill-split-item-lent-paid">
paid <br/> <span>{formatter.format(props.bill.tAmount)}</span>
            </div>
            <div className="bill-split-item-lent-paid">
            lent <br/> <span>{formatter.format(props.bill.pPAmount)}</span>
</div>
</div>

        </div>
    )
 }