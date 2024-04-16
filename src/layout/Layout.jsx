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
    
    return (
        <>
            <div className=' flex  flex-col h-[100%]'>
                <Header />
                <div className='flex scrollbar-default flex-1'>
                    <Sidebar />
                    <div className='m-5 flex-1 w-full'>{children}</div>
                </div>
            </div>
        </>
    );
};

export default Layout;
