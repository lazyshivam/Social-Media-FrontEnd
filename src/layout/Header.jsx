import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    LifeBuoy,
    LogOut,
    Settings,
    User,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/service/userSlice';
import { toast } from 'react-toastify';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const userProfile = useSelector((state) => state.profile.userDetails);
    console.log(userProfile, "log from headers")
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        toast.success('Logged out successfully');
        navigate('/login');

    }

    return (
        <header className="bg-white shadow-md">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <Link to="/home" className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" onClick={toggleMenu}>
                        <span className="sr-only">Open main menu</span>
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <Link to="/home" className="text-sm font-semibold leading-6 text-gray-900">Home</Link>
                    <Link to="/about" className="text-sm font-semibold leading-6 text-gray-900">About</Link>
                    <Link to="/privacy-policy" className="text-sm font-semibold leading-6 text-gray-900">Privacy Policy</Link>

                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src={userProfile?.profilePicture || 'https://github.com/shadcn.png'} alt="@shadcn" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>{ userProfile?.displayName}</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                
                                <DropdownMenuItem>
                                    <User className="mr-2 h-4 w-4" />
                                    <Link to='/profile'>Profile</Link>
                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Settings</span>
                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                </DropdownMenuItem>
                            </DropdownMenuGroup>


                            <DropdownMenuSeparator />

                            <DropdownMenuItem>
                                <LifeBuoy className="mr-2 h-4 w-4" />
                                <span>Support</span>
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">
                                <LogOut className="mr-2 h-4 w-4" />
                                <span onClick={handleLogout}>Log out</span>
                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </nav>
            {isMenuOpen && (
                <div className="lg:hidden" role="dialog" aria-modal="true">
                    <div className="fixed inset-0 z-10"></div>
                    <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <a href="#" className="-m-1.5 p-1.5">
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                            </a>
                            <button type="button" className="-m-2.5 rounded-md p-2.5 text-gray-700" onClick={toggleMenu}>
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 flow-root">
                            <div className="-my-6 divide-y divide-gray-500/10">
                                <div className="space-y-2 py-6">
                                    <Link to="/home" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Home</Link>
                                    <Link to="/about" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">About</Link>
                                    <Link to="/privacy-policy" className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Privacy Policy</Link>
                                </div>
                                <div className="py-6">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>CN</AvatarFallback>
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <DropdownMenuItem>
                                                    <User className="mr-2 h-4 w-4" />
                                                    <span>Profile</span>
                                                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                                                </DropdownMenuItem>

                                                <DropdownMenuItem>
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    <span>Settings</span>
                                                    <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                                                </DropdownMenuItem>
                                            </DropdownMenuGroup>


                                            <DropdownMenuSeparator />

                                            <DropdownMenuItem>
                                                <LifeBuoy className="mr-2 h-4 w-4" />
                                                <span>Support</span>
                                            </DropdownMenuItem>

                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span onClick={handleLogout}>Log out</span>
                                                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
