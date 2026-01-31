import { useContext, useEffect, useState } from "react";
import { getNextQuestion, getPrevQuestion, getQuestion,getQuestionIndex, searchQuestion } from "./source/apptitude/q-methods/question";
import QuestionContext from "./context/QuestionContext";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";




const themes = [ { name: "light", code: 0, class_name: `bg-white text-dark` },
                     { name: "dark", code: 1, class_name: `text-white bg-dark` }
]

const QuestionPage = () => {


const [showAns,setShowAns]=useState(false)
    const { userAns, updateAns,full_q_page_style, setFullQPageStyle} = useContext(QuestionContext);
    const { qcode } = useParams();
    const [question, setQuestion] = useState(getQuestion(qcode))
const [searchParams,setSearchParams]=useSearchParams()
    const navigate=useNavigate();
    useEffect(() => {
        setQuestion(getQuestion(qcode))
    }, [qcode])
const params=useParams();


    const updatequestion = () => {
        let code = document.getElementById("q_search_input").value.toUpperCase()  ;
       if(code==="")return;
        code=searchQuestion(code);
        
       
        if (code){
                        setShowAns(false)
            let new_i=getQuestionIndex(code);
            navigate(`/${params.type}/${params.subject}/${params.topic}/${code}?i=${new_i}`)
           
        }
        else{
         
        }
    }

    const prevQ = () => {
    let code= getPrevQuestion(qcode)
    if(code){
            setShowAns(false)
        let new_i=getQuestionIndex(code);
        navigate(`/${params.type}/${params.subject}/${params.topic}/${code}?i=${new_i}`)
   
    }
    }
    const nextQ = () => {
    let code=    getNextQuestion(qcode)
        if (code){
                    setShowAns(false)
            let new_i=getQuestionIndex(code);
            navigate(`/${params.type}/${params.subject}/${params.topic}/${code}?i=${new_i}`)
       
        }
    }

    const [theme, setTheme] = useState(themes[0]);
    
    const changeTheme = () => {
          
    let n=theme.code;    
    n=(n+1)%themes.length
     setTheme(themes[n])
    }
    
    const [check,setCheck]=useState("");
    const [isRightAns, setIsRightAnswer] =useState("");

    useEffect(()=>{
if(check!=="" )return
    },[check])


const copy=async()=>{

    let q=question.hinText+"\n"+question.engText+"\n Options:- "

 try{   let ch='a'
    for (let op of question.option){
        q+="\n ("+ch+"). "+op;
        ch++;
    }
    await navigator.clipboard.writeText(q)

}
    catch(e){
        console.log(e)
    }

}


const setFullScreen=()=>{
    if(Object.keys(full_q_page_style).length==0){
        const sty={
            position:"fixed",
            left:"0",
            top:"0",
            height:"100%",
            width:"100%"
        }
setFullQPageStyle(sty)}
else setFullQPageStyle({})
}



    return <>
        <div className={`container-fluid m-0 p-2 pt-2 m-0 p-3 ${theme.class_name||null}` } style={{height:"100%"}} >
            <div>
                <div className="container d-flex ">
                   <div className=" border container d-flex ">
                    <input id="q_search_input" className="input col-10 mr-3 border"  type="search" placeholder="Enter question code."/>
                    <button id="search_btn" className="btn border m-1 col-2 "  onClick={updatequestion} >Get</button>
                    </div>
                    <div className="btn border m-1 col-1" id="full_screen_btn" onClick={setFullScreen}>full</div>
                    <button className="btn border col-1 m-1"  onClick={changeTheme}>{theme.name}</button>
                    </div>
                <div className={`container-fluid m-2 ` }>
                 <h3 className="col mr-4 " style={{display:"inline-block"}}>Question :   {qcode} </h3> 
                  <button onClick={copy} id="copy_btn" className="btn border ">copy</button>
                 </div>
                <div className={`container-fluid m-2  fs-4` }>{question.engText}</div>
                <div className={`container-fluid m-2 fs-4 ` }>{question.hinText}</div>
             
                <div className={`container-fluid m-2 ` } >
                   
<hr/>
 <br/>
                    {question.option.map((x) => {
                        if(userAns[qcode]){
                            // right answer
                            if(userAns[qcode]===question.answer){if(x===question.answer)return <h5 className={`border bg-success  text-white option_list`} onClick={()=>{setCheck(x);updateAns(question.qcode, x)}} key={x}> <input type="radio" name="ans" value={x}  onChange={(e) => {setCheck(x);updateAns(question.qcode, e.target.value)}} checked={check===x ||userAns[question.qcode] === x} className="m-3 border text-" />{x}    <li className="col">Greate .....</li> </h5> 
                           else return <h5 className={`border  option_list`} onClick={()=>{setCheck(x);updateAns(question.qcode, x)}} key={x}> <input type="radio" name="ans" value={x}  onChange={(e) => {setCheck(x);updateAns(question.qcode, e.target.value)}} checked={check===x ||userAns[question.qcode] === x} className="m-3 border text-" />{x}</h5>
                        }
                           // wrong answer
                            if(userAns[qcode]===x )return <h5 className={`border bg-danger text-white option_list`} onClick={()=>{setCheck(x);updateAns(question.qcode, x)}} key={x}> <input type="radio" name="ans" value={x}  onChange={(e) => {setCheck(x);updateAns(question.qcode, e.target.value)}} checked={check===x ||userAns[question.qcode] === x} className="m-3 border text-" />{x}   <li className="col">Wrong Answer</li></h5> 
                        else if (x==question.answer)return<h5 className={`border bg-success text-white option_list`} onClick={()=>{setCheck(x);updateAns(question.qcode, x)}} key={x}> <input type="radio" name="ans" value={x}  onChange={(e) => {setCheck(x);updateAns(question.qcode, e.target.value)}} checked={check===x ||userAns[question.qcode] === x} className="m-3 border text-" />{x}   <li className="col">Correct Answer</li></h5> 
                        else return <h5 className={`border  option_list`} onClick={()=>{setCheck(x);updateAns(question.qcode, x)}} key={x}> <input type="radio" name="ans" value={x}  onChange={(e) => {setCheck(x);updateAns(question.qcode, e.target.value)}} checked={check===x ||userAns[question.qcode] === x} className="m-3 border text-" />{x}</h5> 


                        }
                        
                        // no answer
                        return <h5 className={`border  option_list`} onClick={()=>{setCheck(x);updateAns(question.qcode, x)}} key={x}> <input type="radio" name="ans" value={x}  onChange={(e) => {setCheck(x);updateAns(question.qcode, e.target.value)}} checked={check===x ||userAns[question.qcode] === x} className="m-3 border text-" />{x}</h5> })}
                </div>
            </div>

<div className="container   d-flex m-2 p-2"><div className="col-2 bg-warning text-white " onClick={()=>{if(!showAns)setShowAns(true)}}>See Answer</div>{showAns?<><div className="col-2"></div><div className="col border-success text-success ">{question.answer}</div></>:<></>}</div>
            <div className="container m-0 pt-2 d-flex "><button className="btn bg-secondary m-3 mt-0 col-2" onClick={prevQ}>Prev</button> <button className="col-2 m-3 mt-0 btn bg-secondary " onClick={nextQ}>Next</button></div>
        </div>
    </>



}

export default QuestionPage;