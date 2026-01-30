import { Link, Outlet, useParams, useSearchParams } from "react-router-dom";
import { questions } from "./source/apptitude/questions1";
import { useContext, useState } from "react";
import QuestionContext from "./context/QuestionContext";


const AllQuestions=()=>{
const [searchParams,setSearchParams]=useSearchParams();
const [i,setI]=useState(searchParams.get("i"))
const {userAns}=useContext(QuestionContext)

const params=useParams()
    const next=()=>{
     
        if(parseInt(i)+10<questions.length){setSearchParams({i:parseInt(i)+10})
        setI(parseInt(i)+10)
        }
    }
 const prev=()=>{
   let n=Math.trunc(Math.log10(i))-10
        if(parseInt(i)-10>=0){setSearchParams({i:parseInt(i)-10})
        setI(parseInt(i)-10)
        }
            else{ searchParams({i:0})
    setI(0)    
    }
    }
return<>

<div className="container-fluid m-0 p-0 d-flex ">
    <div className="col-2">
<h3>Questions</h3>
{
    questions.slice(i,(parseInt(i)+10)||null).map(x=>{
        if(params.qcode && params.  qcode===x.qcode)return<div key={x.qcode} className="col border-success  border p-2 m-1"><Link to={""+x.qcode+`?i=${i}`}><div className="text-success">{x.qcode}</div></Link></div>
   
   // for question attempt
        if(userAns[x.qcode])return<div key={x.qcode} className="col bg-secondary text-white border p-2 m-1"><Link to={""+x.qcode+`?i=${i}`}><div className="text-white">{x.qcode}</div></Link></div>
       
        return <div key={x.qcode} className="col border p-2 m-1"><Link to={""+x.qcode+`?i=${i}`}>{x.qcode}</Link></div>
    })
}
<div className="container-fluid d-flex m-0 mt-1 p-1"><button className="btn border" onClick={prev}>prev</button><button className="btn border" onClick={next}>Next</button></div>
<div className="container bg-primary text-white">See Result</div>
</div>
<div className="col-10 p-0 m-0 flex-grow-1"><Outlet></Outlet></div>
</div>
</>
}


export default AllQuestions;