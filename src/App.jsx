import { useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Routes, Route, Outlet } from 'react-router-dom';
import UserLogin from './page/auth/UserLogin';
import UserRegister from './page/auth/UserRegister';
import Home from './page/Home';
import ForgotPassword from './page/auth/ForgotPassword';
import ResetPassword from './page/auth/ResetPassword';
import Footer from './page/Footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='h-screen'>
      <ToastContainer />
      {/* <Outlet/> */}
      {/* <UserLogin /> */}
      <Routes>
        <Route exact path='/login' element={<UserLogin />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />


        <Route path='/register' element={<UserRegister />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      <Footer/>

    </div>
  )
}

export default App
