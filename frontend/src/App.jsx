
import './App.css'
import {Route, Routes} from 'react-router-dom'
import Home from './component/Home'
import QuestionPage from './component/QuestionPage'
import SelectSubject from './component/SelectSubject'
import SelectTopic from './component/SelectTopic'
import AllQuestions from './component/AllQuestions'


function App() {
 

  return <>


<Routes>
  <Route path='/' element={<Home/>}>
   <Route path=':type' element={<SelectSubject/>}>
     <Route path=':subject' element={<SelectTopic/>}>
      <Route path=':topic' element={<AllQuestions/>}>
      <Route path=':qcode' element={<QuestionPage />}></Route>
      </Route> 
     </Route>
   </Route>
  </Route>
 

 
 
   
</Routes>
  </>
}

export default App
