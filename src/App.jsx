import { useEffect, useState } from 'react'
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import UserLogin from './page/auth/UserLogin';
import UserRegister from './page/auth/UserRegister';
import Home from './page/Home';
import ForgotPassword from './page/auth/ForgotPassword';
import ResetPassword from './page/auth/ResetPassword';
import Footer from './page/Footer';
import Header from './layout/Header';
import PrivateRoute from './routing/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import PageNotFound from './page/PageNotFound';
import { loginSuccess } from './service/userSlice';
import { addProfile } from './service/userProfileSlice';
import UserProfile from './page/userProfile/UserProfile';
import CreateProfileForm from './page/userProfile/CreateProfileForm';
import EditProfile from './page/userProfile/EditProfile';
import { BASE_URL } from './config/config';
import Layout from './layout/Layout';
import CreatePost from './page/posts/CreatePost';

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, []);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const GetProfileDetails = async () => {
    // if (!isLoggedIn) {
    //   navigate('/login');
    //   return;
    // }
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/profile/getProfile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${localStorage.getItem('authToken')}`
        },

      });

      const res = await response.json();

      if (res.code === 200) {
        // setUserProfile(res.data);
        dispatch(addProfile(res.data));

      }
      else if (res.code === 401) {
        toast.error(res.message);
        navigate('/login')

      }
      else if (res.code === 400) {
        toast.error(res.message);
      }


    } catch (error) {
      // Handle error
      console.error('Login error:', error.message);
      toast.error(error.message || 'Failed to fetch profile details');
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    GetProfileDetails();
  }, [isLoggedIn])

  return (
    <div className=''>
      <ToastContainer />
      <Layout>
        <Routes>

          <Route exact path='/login' element={<UserLogin />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />


          <Route path='/register' element={<UserRegister />} />
          <Route path='*' element={<PageNotFound />} />

          {/* Bellow are protect routes */}

          <Route path="/home" element={<PrivateRoute />} >
            <Route index element={<Home />} />
          </Route>

          <Route path="/profile" element={<PrivateRoute />} >
            <Route index element={<UserProfile />} />
          </Route>
          <Route path="/createProfile" element={<PrivateRoute />} >
            <Route index element={<CreateProfileForm />} />
          </Route>
          <Route path="/createPost" element={<PrivateRoute />} >
            <Route index element={<CreatePost />} />
          </Route>
          <Route path="/editProfile" element={<PrivateRoute />} >
            <Route index element={<EditProfile />} />
          </Route>

        </Routes>
      </Layout>

      <Footer />

    </div>
  )
}

export default App
