

import { Link, Outlet } from "react-router-dom";
const SelectTopic=()=>{

return<>

<div className="container-fluid d-flex p-2 m-0 mt-1 bg-success">
    <div className="col-3"><Link to="percentages?i=0"><div className="text-white">Percentage</div></Link></div>
     <div className="col-3"><Link to="percentages?i=0"><div className="text-white">Ratio & Proportion</div></Link></div>

</div>
<div><Outlet/></div>
</>
}


export default SelectTopic;