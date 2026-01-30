import { Link, Outlet } from "react-router-dom";





const SelectSubject=()=>{

return<>

<div className="container-fluid d-flex bg-secondary mt-1 ">
    <div className="col-3 text-white"><Link to="apptitude"><div className="text-white">Apptitude</div></Link></div>
    <div className="col-3"><Link to="apptitude"><div className="text-white">Soft Skill</div></Link></div>
    <div className="col-3"><Link to="apptitude"><div className="text-white">DSA</div></Link></div>
</div>
<div><Outlet/></div>
</>
}


export default SelectSubject;