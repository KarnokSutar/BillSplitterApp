import {useNavigate} from 'react-router-dom'
import { useEffect, useState } from 'react';

import {useDispatch, useSelector} from 'react-redux'
import { authActions } from '../slices/auth';
// import { billAction } from '../slices/bill-splitter';

export function LoginForm(props){
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const[password, setPassword] = useState('')
   const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
  //  const token = useSelector(state=>state.auth.token)

  useEffect(()=>{
    console.log(isAuthenticated)
    console.log('Login-form-use-effect')
     if(isAuthenticated){
      navigate('/home');
     }
  },[isAuthenticated,navigate])
    function emailChangeHandler (event){
     setEmail(event.target.value)
    }
    function passwordChangeHandler(event){
     setPassword(event.target.value)
    }
   
   function loginHandler(event){
     event.preventDefault();
     dispatch(authActions.login({email, password}))
   }
       return(
           <form onSubmit={loginHandler}>
           <div className='authentication-container'>
             <h1>Log In</h1>
             <hr/>
             <input type="text" placeholder="Enter Email" name="email" value={email} onChange ={emailChangeHandler} required/>
         
             {/* <label for="psw"><b>Password</b></label> */}
             <input type="password" placeholder="Enter Password" name="psw" value={password}
             onChange={passwordChangeHandler} required/>
   <hr/>
             <div className='add-bill-form-btn-container'><button type="submit" className="btn">Log In</button></div>
           </div>
           
           <div class="container signin">
            <div>New Here? Want to Create a new <p onClick={()=>(navigate('/'))} style={{color:'blue', 
           cursor:'pointer'}}>Account?</p>.</div>
           </div>
         </form>
       )
   }