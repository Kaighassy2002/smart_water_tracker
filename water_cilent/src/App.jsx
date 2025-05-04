
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from "./pages/Login"
import Register from './pages/Register'
import Home from "./pages/Home"

import Dashboard from './pages/Dashboard'
import Charts from './pages/Charts'
import Flowchart from './pages/FlowChart'


import SensorChart from './pages/SensorChart'


function App() {
 
  return (
    <>
    
     {/* <Header/> */}
      <Routes>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/charts' element={<Charts/>}/>
      <Route path='/flowchart' element={<Flowchart/>}/>
      
      <Route path='/senseor' element={<SensorChart/>}/>
      </Routes>
     
    </>
  )
}

export default App
