import { Button } from '@/components/ui/button';
import { CircleFadingPlus, CopyPlus } from 'lucide-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const userProfile = useSelector((state) => state.profile.userDetails);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };
    const navigate = useNavigate();

    return (
        <div>
            <button
                onClick={toggleSidebar}
                className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
                <span className="sr-only">Toggle sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                id="default-sidebar"
                className={`z-50 shadow-md shadow-slate-300 scrollbar-default overflow-y-auto w-64 h-full bg-slate-300 transition-transform ${
                    isOpen ? 'translate-x-0' : '-translate-x-full  sm:translate-x-0'
                }`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 py-4 overflow-y-auto  dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to="/createPost"
                                className="flex items-center p-2 bg-yellow-600 shadow-lg shadow-yellow-100 text-white rounded-lg dark:text-white hover:bg-yellow-700 dark:hover:bg-gray-700 group"
                            >
                               
                                <CopyPlus />
                                <span className="flex-1 ms-3 whitespace-nowrap">Create New Post </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/yourStory"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                              <CircleFadingPlus />
                                <span className="flex-1 ms-3 whitespace-nowrap">Your Story</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/following-users"
                                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <svg
                                    className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                                <span className="flex-1 ms-3 whitespace-nowrap">Following Users</span>
                            </Link>
                        </li>
                        {userProfile?.following ? (
                            userProfile.following.map((user) => (
                                <li onClick={()=>navigate(`/authorProfile/${user._id}`)} key={user._id} className="flex cursor-pointer items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                                    <img src={user.profilePicture} alt={`${user.username}'s profile`} className="w-8 h-8 rounded-full mr-2" />
                                    <span className="flex-1 whitespace-nowrap">{user.username}</span>
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-900 rounded-lg dark:text-white">Loading...</li>
                        )}
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
