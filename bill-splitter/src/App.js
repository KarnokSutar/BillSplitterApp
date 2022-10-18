import { Header } from "./components/Header";
// import { HomePage } from "./components/Home/HomePage";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { HomePageHome } from "./components/Home/HomePageHome";
import { HomePageProfileDetails } from "./components/Home/HomePageProfileDetails";
import { HomePageSideBar } from "./components/Home/HomePageSideBar";
import {Routes, Route, useNavigate} from 'react-router-dom'
import { AddBillForm } from "./components/AddBillForm";
import { RegistrationForm } from "./components/RegistrationForm";
import { LoginForm } from "./components/LoginForm";
// import { Test } from "./components/Test";
import { authActions } from "./slices/auth";
import { billAction } from "./slices/bill-splitter";
import { useEffect, useState } from "react";
import { Dashboard } from "./components/Dashboard";
import { AddFriend } from "./components/AddFriend";
import { CreateGroupForm } from "./components/CreateGroupForm";

function App() {
  console.log('App')
  const[initialised, setInitialised] = useState(0);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const token = useSelector(state=> state.auth.token, shallowEqual);
  const loading = useSelector(state=> state.billsplitter.loading);
  const isAuthenticated = useSelector(state=> state.auth.isAuthenticated);
  const activeGroupId = useSelector(state=> state.billsplitter.activeGroupId);

  useEffect(()=>{
    console.log(' APP- Use Effect')
    if(token !==''){
      dispatch(billAction.fetchFriends({token}));
      dispatch(billAction.fetchGroup({token}));
      if(activeGroupId!==''){
        dispatch(billAction.fetchBills({token, activeGroupId}));
      dispatch(billAction.fetchMembers({token, activeGroupId}));
        dispatch(billAction.fetchMinimumTransaction({token, activeGroupId}))
      }      
  }},[dispatch, token,isAuthenticated,navigate, activeGroupId]);
  // useEffect(()=>{
  //   if (isAuthenticated){
  //     navigate('/home')
  //     console.log(isAuthenticated)
  //         }
  // }, [isAuthenticated,navigate])

  console.log(token)
  if (initialised===0 ){
    dispatch(authActions.fetchUserData());
    setInitialised(initialised+1);  
  }

  if(token !=='' & initialised===1){
    // dispatch(billAction.fetchFriends({token}));
    // dispatch(billAction.fetchBills({token}));
    if (isAuthenticated){
      navigate('/home')
      console.log(isAuthenticated)
          }
    setInitialised(initialised+1);
  }
    

  


  return (
    <>
{loading && <div className="full-blurred-background"> <div className="loader"></div> </div>}
    <Header/>
    {/* <Test/> */}
<Routes>
<Route path="/" element = {<RegistrationForm/>}/>
<Route path="/login" element = {<LoginForm/>}/>
    <Route path="/home" element ={<div className="home-page-container">
<HomePageSideBar/>
<HomePageHome/>
<HomePageProfileDetails/>
</div>}/>
    <Route path="/addbill" element ={<div className="home-page-container">
<HomePageSideBar/>
<AddBillForm/>
<HomePageProfileDetails/>
</div>}/>
<Route path="/dashboard" element ={<div className="home-page-container">
<HomePageSideBar/>
<Dashboard/>
<HomePageProfileDetails/>
</div>}/>
<Route path="/addfriend" element ={<div className="home-page-container">
<HomePageSideBar/>
<AddFriend/>
<HomePageProfileDetails/>
</div>}/>
<Route path="/creategroup" element ={<div className="home-page-container">
<HomePageSideBar/>
<CreateGroupForm/>
<HomePageProfileDetails/>
</div>}/>
      </Routes>
    </>
  );
}

export default App;
