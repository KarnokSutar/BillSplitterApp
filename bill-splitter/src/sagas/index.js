
import { authActions } from "../slices/auth"
import { all, put, takeLatest } from 'redux-saga/effects'
import axios from "axios"
import { billAction } from "../slices/bill-splitter"
import { saveUserData, clearUserData, requestUserData } from "../api"


// const apiURL = 'http://127.0.0.1:8000/api'
const apiURL = 'http://127.0.0.1:5000'

// const apiURL ='https://billsplitter-backend.herokuapp.com/api'

const authAxios = (token) => axios.create(
  {baseURL: apiURL,
  headers: {
    Authorization: token
  } }
)

function* loginUser({payload}) {
    try {
        const{data} = yield axios.post(`${apiURL}/login`, {
            email: `${payload.email}`,
            password: `${payload.password}`
        })
        yield saveUserData(data)
       yield put(authActions.loginSuccess(data))
    } catch (error) {
        console.log(error.message)
      yield put(authActions.loginError(error.message))
    }
  }

  function* registerUser({payload}) {
    try {
        const{data} = yield axios.post(`${apiURL}/register`, {
            name:`${payload.name}`,
            email: `${payload.email}`,
            password: `${payload.pass}`,
            password_confirmation: `${payload.repeatPass}`
        })

        console.log(data)
        yield saveUserData(data)
       yield put(authActions.registerSuccess(data))
    } catch (error) {
        console.log(error.message)
      yield put(authActions.loginError(error.message))
    }
  }

  function* logoutUser({payload}) {    
    try {
        yield authAxios(payload).post(`${apiURL}/logout`)  
      yield put(authActions.logoutSuccess())
    } catch (error) {
      yield put(authActions.logoutSuccess())
      console.log(error)
    }
    yield clearUserData();
  }

  function* fetchFriends({payload}) {
    console.log("Fetch Friends - saga")
    try {
       const {data}= yield authAxios(payload.token).get(`${apiURL}/friends`)  
      yield put(billAction.fetchFriendsSuccess(data))
    } catch (error) {
      yield put(authActions.loginError(error))
      console.log(error)
    }
  }

  function* fetchUserData(){
    console.log("Fetch User Data - saga")
    const user = yield requestUserData()
    console.log(user)
    if (user){ yield put(authActions.loginSuccess(user)) }
  }
  function* addBill({payload}) {
    console.log('addBill - indexsaga')
    const bodyFormData = new FormData();

payload.friendsId.forEach((friend, index) => {
    bodyFormData.append(`friends_id[${index}]`, friend);
});
console.log(bodyFormData)
    try {
        const{data} = yield authAxios(payload.token).post(`${apiURL}/createbill`, {
            title: `${payload.title}`,
            tamount: `${+(payload.amountNumber)}`,
            ppamount: `${payload.averageAmount}`,
            debtors: payload.friendsId,
            groupid: payload.activeGroupId
        })

        console.log(data)
       yield put(billAction.createNewBillSuccess(data))
    } catch (error) {
        console.log(error.message)
        console.log(error.response.data)
      yield put(authActions.loginError(error.message))
    }
  }

  function* fetchBills({payload}) {
    console.log("Fetch Bills - saga")
    try {
       const {data}= yield authAxios(payload.token).post(`${apiURL}/bills`,{
        groupid: payload.activeGroupId
       })  
       console.log(data.lent)
      yield put(billAction.fetchBillsSuccess(data))
    } catch (error) {
      yield put(authActions.loginError(error))
      console.log(error)
    }
  }

  function* createNewGroup({payload}) {
    console.log('create-New-Group - indexsaga')
    const bodyFormData = new FormData();

payload.friendsId.forEach((friend, index) => {
    bodyFormData.append(`friends_id[${index}]`, friend);
});
console.log(bodyFormData)
    try {
        const{data} = yield authAxios(payload.token).post(`${apiURL}/creategroup`, {
            name: `${payload.title}`,
            members: payload.friendsId
        })

        console.log(data)
       yield put(billAction.createGroupSuccess(data))

    } catch (error) {
        console.log(error.message)
        console.log(error.response.data)
      yield put(authActions.loginError(error.message))
    }
  }
  function* fetchGroups({payload}) {
    console.log("Fetch Groups - saga")
    try {
       const {data}= yield authAxios(payload.token).get(`${apiURL}/groups`,)  
       console.log(data)
      yield put(billAction.fetchGroupSuccess(data))
    } catch (error) {
      yield put(authActions.loginError(error))
      console.log(error)
    }
  }
  function* fetchMembers({payload}) {
    console.log("Fetch <Members> - saga")
    try {
       const {data}= yield authAxios(payload.token).post(`${apiURL}/members`,{
        groupid: payload.activeGroupId
       })  
      yield put(billAction.fetchMembersSuccess(data))
    } catch (error) {
      yield put(authActions.loginError(error))
      console.log(error)
    }
  }
  function* searchUsers({payload}) {
    console.log("Fetch <search users> - saga")
    try {
       const {data}= yield authAxios(payload.token).post(`${apiURL}/searchfriend`,{
        name: payload.searchText
       })  
       console.log(data)
      yield put(billAction.searchUserSuccess(data))
    } catch (error) {
      yield put(authActions.loginError(error))
      console.log(error)
    }
  }
  function* fetchAllUsers({payload}) {
    console.log("Fetch <all users> - saga")
    try {
       const {data}= yield authAxios(payload.token).get(`${apiURL}/allusers`);  
       console.log(data)
      yield put(billAction.searchUserSuccess(data))
    } catch (error) {
      yield put(authActions.loginError(error))
      console.log(error)
    }
  }

  function* addFriend({payload}) {
    console.log("Fetch <add friend > - saga")
    try {
       const {data}= yield authAxios(payload.token).post(`${apiURL}/addfriend`,{
        friend_id: payload.userId
       })  
       console.log(data)
      yield put(billAction.addFriendSuccess(data))
    } catch (error) {
      yield put(authActions.loginError(error))
      console.log(error)
    }
  }
  function* fetchTransactions({payload}) {
    console.log("Fetch <Transactions> - saga")
    try {
       const {data}= yield authAxios(payload.token).post(`${apiURL}/db`,{
        groupid: payload.activeGroupId
       })  
       console.log(data)
      yield put(billAction.fetchMinimumTransactionSuccess(data))
    } catch (error) {
      yield put(authActions.loginError(error))
      console.log(error)
    }
  }

  function* rootSaga(){
    yield all([
        // takeLatest(mealsAction.loadMeals.type , fetchMeals),
        takeLatest(authActions.login.type, loginUser),
        takeLatest(authActions.logout.type, logoutUser),
        takeLatest(authActions.register.type, registerUser),
        takeLatest(billAction.fetchFriends.type, fetchFriends),
        takeLatest(authActions.fetchUserData.type, fetchUserData),
        takeLatest(billAction.createNewBill.type, addBill),
        takeLatest(billAction.fetchBills.type, fetchBills),
        takeLatest(billAction.createGroup.type, createNewGroup),
        takeLatest(billAction.fetchGroup.type, fetchGroups),
        takeLatest(billAction.fetchMembers.type, fetchMembers),
        takeLatest(billAction.searchUser.type, searchUsers),
        takeLatest(billAction.fetchAllUsers.type, fetchAllUsers),
        takeLatest(billAction.addFriend.type, addFriend),
        takeLatest(billAction.fetchMinimumTransaction.type, fetchTransactions),
        // takeLatest(cartAction.addToCart.type, addToCart),
        // takeLatest(cartAction.fetchCartItems.type, loadToCart),
    ])
}
export default rootSaga;


