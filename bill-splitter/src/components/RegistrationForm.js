import { useRState } from "./hooks/user-state"
import {useNavigate} from "react-router-dom"
import  {useDispatch, useSelector} from 'react-redux'
import { authActions } from "../slices/auth";
export function RegistrationForm(props){
    const navigate = useNavigate();
    const dispatch = useDispatch()
  const {value: name, setValue: setName} = useRState()
  const {value: email, setValue: setEmail} = useRState()
  const {value: pass, setValue: setPass} = useRState()
  const {value: repeatPass, setValue: setRepeatPass} = useRState()
const userLoggedIN = useSelector(state=>state.auth.isAuthenticated);
  function goToLoginForm(){
navigate('/login');
  }
  
  function registrationHandler(event){
    console.log(name, email,pass,repeatPass)
    event.preventDefault();
  dispatch(authActions.register({name, email, pass, repeatPass}));
  if (userLoggedIN){
    navigate('/home');
  }
  }
  
  
      return(
          <form onSubmit={registrationHandler}>
          <div className="authentication-container">
            <h1>Register</h1>
            <hr/>
            <input type="text" placeholder="Enter Name" name="name" onChange={setName} required/>
            {/* <label for="email"><b>Email</b></label> */}
            <input type="text" placeholder="Enter Email" name="email" onChange={setEmail} required/>
        
            {/* <label for="psw"><b>Password</b></label> */}
            <input type="password" placeholder="Enter Password" name="psw" onChange={setPass} required/>
        
            {/* <label for="psw-repeat"><b>Repeat Password</b></label> */}
            <input type="password" placeholder="Repeat Password" name="psw-repeat" onChange={setRepeatPass} required/>
            <hr/>        
           <div className="add-bill-form-btn-container"><button type="submit" className="btn">Register</button>
           </div> 
           <div className="signin">Already have an account?<p onClick={goToLoginForm} style={{color:"blue",  cursor:"pointer"}}>Sign In</p></div>
          </div>
          
          <div >
          </div>
        </form>
      )
  }