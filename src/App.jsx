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
import PostDetails from './page/posts/PostDetails';
import AuthorProfile from './page/posts/AuthorProfile';
import UserPost from './page/posts/userPost/UserPost';
import { fetchPosts } from './service/postSlice';
import YourStory from './page/userProfile/YourStory';
import { Rings } from 'react-loader-spinner';

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch();
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      dispatch(loginSuccess(user));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchPosts());
}, [dispatch]);

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
        navigate('/home');
        dispatch(addProfile(res.data));

      }
      else if (res.code === 401) {
        // toast.error(res.message);
        navigate('/login')

      }
      else if (res.code === 400) {
        console.log(res.message);
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
    GetProfileDetails()
  }, [isLoggedIn]);
  
  if (isLoading) {
    return (
        <div className="flex justify-center  items-center h-screen">
            <div className="text-center">
                <Rings
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    ariaLabel="rings-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        </div>
    );


}

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
          <Route path="/editProfile" element={<PrivateRoute />} >
            <Route index element={<EditProfile />} />
          </Route>

          {/* post related routes here */}
          <Route path="/createPost" element={<PrivateRoute />} >
            <Route index element={<CreatePost />} />
          </Route>
          <Route path="/post/:postId" element={<PrivateRoute />} >
            <Route index element={<PostDetails />} />
          </Route>
          <Route path="/authorProfile/:id" element={<PrivateRoute />} >
            <Route index element={<AuthorProfile />} />
          </Route>

          <Route path="/userPost/:id" element={<PrivateRoute />} >
            <Route index element={<UserPost />} />
          </Route>
          <Route path="/yourStory" element={<PrivateRoute />} >
            <Route index element={<YourStory />} />
          </Route>
         

        </Routes>
      </Layout>

      <Footer />

    </div>
  )
}

export default App
