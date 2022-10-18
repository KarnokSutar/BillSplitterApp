
import { HomePageHome } from "./HomePageHome"
import { HomePageProfileDetails } from "./HomePageProfileDetails"
import { HomePageSideBar } from "./HomePageSideBar"


export function HomePage(){
return(

<div className="home-page-container">
<HomePageSideBar/>
<HomePageHome/>
<HomePageProfileDetails/>
</div>
)
}