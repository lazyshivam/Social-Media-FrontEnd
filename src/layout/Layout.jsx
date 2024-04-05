import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
    const location = useLocation();
    const authRoutes = ['/login', '/forgot-password', '/reset-password', '/register'];

    // Check if the current route is an authentication-related route
    const isAuthPage = authRoutes.includes(location.pathname);

    // Render layout only if it's not an authentication-related page
    if (isAuthPage) {
        return <>{children}</>;
    }
    // .layout {
    //     display: flex;
    //     flex-direction: column;
    //     height: 100%;
    // }
    
    // .content {
    //     display: flex;
    //     flex: 1;
    // }
    
    // .main-content {
    //     flex: 1;
    //     padding: 20px; /* Adjust as needed */
    // }
    
    return (
        <>
            <div className=' flex flex-col h-[100%]'>
                <Header />
                <div className='flex  flex-1'>
                    <Sidebar />
                    <div className='m-5 flex-1 w-full'>{children}</div>
                </div>
            </div>
        </>
    );
};

export default Layout;
