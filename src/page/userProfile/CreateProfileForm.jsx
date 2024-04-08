import { BASE_URL } from '@/config/config';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {useDispatch} from 'react-redux'
import { addProfile } from '@/service/userProfileSlice';

const CreateProfileForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        displayName: '',
        bio: '',
        profilePicture: '',
    });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) => {
        setFormData({ ...formData,[e.target.name]: e.target.value });
    };

    const dispatch = useDispatch();

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, profilePicture: reader.result });
        };
        reader.readAsDataURL(file);
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/profile/createProfile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
                body: JSON.stringify(formData)
            });

            const res = await response.json();
            
            if (res.code === 200) {
                toast.success(res.message);
                dispatch(addProfile(res.data));
                navigate('/profile')
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
            toast.error(error.message || 'Profile creation  failed');
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create your profile
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder='Enter your username'
                                    onChange={handleChange}
                                    value={formData.username}
                                    autoComplete="username"
                                    required
                                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="displayName" className="block text-sm font-medium leading-6 text-gray-900">
                                Display Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="displayName"
                                    placeholder='Enter a display name'
                                    name="displayName"
                                    type="text"
                                    onChange={handleChange}
                                    value={formData.displayName}
                                    autoComplete="displayName"
                                    required
                                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="profilePicture" className="block text-sm font-medium leading-6 text-gray-900">
                               Profile Picture
                            </label>
                            <div className="mt-2">
                          
                                <input
                                    accept="image/*" 
                                    id="profilePicture"
                                    placeholder='Enter a display name'
                                   
                                    type="file"
                                    onChange={handleFileInputChange}

                                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">
                                Bio
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="bio"
                                    name="bio"
                                    rows={4}
                                    placeholder='Enter your bio here'
                                    onChange={handleChange}
                                    value={formData.bio}
                                    autoComplete="bio"
                                    className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                ></textarea>
                            </div>
                        </div>



                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isLoading ? 'Please wait..' : 'Submit'}
                            </button>
                        </div>
                    </form>


                </div>
            </div>
        </>
    )
}

export default CreateProfileForm