import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />; 
  }

  return <Outlet />; 
};

export default PrivateRoute;
