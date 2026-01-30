import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import QuestionContext from "./context/QuestionContext";




const Home=()=>{

   


return <>
<div className=" container-fluid d-flex bg-primary" style={{height:"9%",position:"fixed"}}></div>
<div className="container-fluid m-0 p-0 " style={{height:"85%",top:"10%",position:"fixed"}}>
   
    <div className=" container-fluid d-flex bg-info m-0 "  >
        <div className="col-4" ><Link to="/mcq"><div className="text-white">MCQ</div></Link></div>
    </div>
    <div>
        <Outlet/>
    </div>
</div>
<footer className="container-fluid m-0 mt-1  bg-secondary" style={{top:"95%",position:"fixed" ,height:"5%"}}>
    @sbh production
</footer>
</>
}

export default Home;