import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllQuestions } from "../source/apptitude/q-methods/question";



const QuestionContext = createContext(null);


export const QuestionContextProvider = ({ children }) => {

    const { qcode } = useParams();

    const [questions, setQuestions] = useState({})
    const [userAns, setAns] = useState({ x: "sbh" });
    const updateQuestions = ({ subject, type }) => {
        if (subject === "apptitude") setQuestions(getAllQuestions())
    }



    useEffect(() => {
        localStorage.clear()
        let anss = JSON.parse(localStorage.getItem("user_answers"));
     console.log(anss)
        if (anss ) setAns(anss)
        else setAns({ a: "sbh" })
    }, [])


    const updateAns = (qcode, ans) => {
        let answers = userAns;
        answers[qcode] = ans;
        setAns(answers);
        console.log(answers)
        localStorage.setItem("user_answers", JSON.stringify(answers))
        console.log(localStorage.getItem("user_answers"))
    }


    return <>
        <QuestionContext.Provider value={{ questions, updateQuestions, userAns, updateAns }} >{children}</QuestionContext.Provider>

    </>

}

export default QuestionContext;