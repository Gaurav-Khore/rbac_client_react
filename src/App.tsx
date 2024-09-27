import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Login from './components/login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './components/home'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserInfo } from './components/userInfo'
import { RoleInfo } from './components/roleInfo'
import { Welcome } from './components/welcome'
import { SignUp } from './components/signup'


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'element = {<Welcome />} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/signup' element = {<SignUp />} />
      <Route path='/home' element = {<HomePage />}/>
      <Route path='/userInfo/:userID' element = {<UserInfo />} />
      <Route path='/roleInfo/:roleName' element= {<RoleInfo />}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
