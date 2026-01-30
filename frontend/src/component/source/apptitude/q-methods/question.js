import { questions } from "../questions1"



export const getQuestion=(qcode)=>{

for(let q of questions){
    if(q.qcode===qcode)return q;
}
return null;

}

export const getAllQuestions=()=>{
    return questions;
}

export const getQuestionIndex=(qcode)=>{
let i=-1;
for(let q of questions){
    i++;
    if(q.qcode===qcode)return i;
}
return -1;
}



export const getNextQuestion=(qcode)=>{

    for(let i=0;i<questions.length-1;i++){
if(questions[i].qcode===qcode){
    return questions[i+1].qcode
}
    }
    return null;
}

export const getPrevQuestion=(qcode)=>{

    for(let i=1;i<questions.length;i++){
if(questions[i].qcode===qcode){
    return questions[i-1].qcode
}
    }
    return null;
}