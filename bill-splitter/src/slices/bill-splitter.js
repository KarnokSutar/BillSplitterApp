import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    friends:[],
    owed:[],
    lent:[],
    bills:[],
    groups:[],
    members:[],
    searchedUsers:[],
    transactions:[],
    activeGroupId:'',
    totalOwedAmount:0,
    totalLoanedAmount:0,
    loading:false

}
const billsplitter = createSlice(
    {
        name: 'billsplitter',
        initialState: intialState,
        reducers:{
fetchFriends(state, {payload}){
state.loading = true;
},

fetchFriendsSuccess(state, {payload}){
state.friends = payload.friends;
state.loading= false;
},

createNewBill(state,{payload}){
    state.loading = true;
},
createNewBillSuccess(state, {payload}){
    console.log(payload)
state.bills = payload.bill
state.owed = payload.owed;
state.lent = payload.lent;
state.totalOwedAmount = 20 //payload.totalowedamount;
state.totalLoanedAmount=  20  //payload.totalloanedamount
state.loading= false;
},
fetchBills(state, {payload}){
    state.loading = true;
},
fetchBillsSuccess(state, {payload}){
    state.bills = payload.bill;
    state.owed = payload.owed;
    state.lent = payload.lent;
    state.totalOwedAmount = 20  // payload.totalowedamount;
    state.totalLoanedAmount=  20 //payload.totalloanedamount;
    state.loading= false;
},
fetchGroup(state, {payload}){
    state.loading = true;
},
fetchGroupSuccess(state, {payload}){
    state.groups= payload.groups
    state.loading= false;
},
createGroup(state, {payload}){
    state.loading = true;
},
createGroupSuccess(state, {payload}){
    state.groups= payload.groups
    state.loading= false;
},
changeActiveGroup(state, {payload}){
state.activeGroupId = payload;
},
fetchMembers(state, {payload}){
    state.loading = true;
},
fetchMembersSuccess(state, {payload}){
    state.members= payload.members
    state.loading= false;
},
searchUser(state,{payload}){
    state.loading = true;
},
fetchAllUsers(state, {payload}){
state.loading = true;
},
searchUserSuccess(state, {payload}){
    state.searchedUsers=payload.users;
    state.loading = false;
},
addFriend(state, {payload}){
    // state.searchedUsers = state.searchedUsers.filter((user)=>{
    //     return user.id !== payload.userId;
    // })
    state.loading = true;
    },
    addFriendSuccess(state, {payload}){
        state.friends=payload.friends;
        console.log(payload)
        // alert('Friend Added')
        state.loading = false;
    },

    fetchMinimumTransaction(state,{payload}){
        state.loading = true;
    },
    fetchMinimumTransactionSuccess(state,{payload}){
        state.transactions = payload.db;
        state.loading = false;
    }

        }
    }
);

export const billAction = billsplitter.actions;
export default billsplitter.reducer;