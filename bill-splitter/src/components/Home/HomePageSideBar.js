import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom"
import { authActions } from "../../slices/auth";
import { GroupItem } from "../GroupItem";


export function HomePageSideBar(){
const navigate = useNavigate();
const dispatch = useDispatch();

const isAuthenticated = useSelector(state=>state.auth.isAuthenticated)
const token = useSelector(state=>state.auth.token)
const groups = useSelector(state=>state.billsplitter.groups)

const renderGroups = groups.map((group)=>{
    return <GroupItem group ={group} />
})
if(!isAuthenticated){
    navigate('/')
}


    return(
        <div className="home-page-children flex-basis-29">
        {/* <Card>
            <div className="home-page-sidebar-container">
            This is Home Page Sidebar
            </div>  
        </Card> */}
        <div className="home-page-sidebar-container">
        <div onClick={()=>{
                navigate('/home')
            }} className="home-page-sidebar-option">Home
            </div>
            <div onClick={()=>{
                navigate('/dashboard')
            }} className="home-page-sidebar-option">Dashboard
            </div>
            <div onClick={()=>{
                navigate('/addfriend')
            }} className="home-page-sidebar-option">Add Friend
            </div>
            <div className="home-page-sidebar-option">Groups
            </div>
            <div className="group-list">
{renderGroups}
            </div>
            { isAuthenticated && <div onClick={()=>{dispatch(authActions.logout(token))}} className="home-page-sidebar-option">Log Out
            </div>}
            </div>  

      
        </div>
    )
}