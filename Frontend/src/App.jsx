import React from 'react'
import {Routes , Route} from "react-router-dom"
import Home from "./component/Home";
import Signup from "./component/Signup";
import Login from "./component/Login";



function App() {
  return (
    <Routes>
      <Route path='/' element={<Home></Home>}/>
      <Route path='/signup' element={<Signup></Signup>}/>
      <Route path='/login' element={<Login></Login>}/>
    </Routes>
  )
}

export default App
