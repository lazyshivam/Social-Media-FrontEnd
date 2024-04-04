import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config/config';
import queryString from 'query-string'

const ResetPassword = () => {
    const [formData, setFormData] = useState({
        newPassword: '',
        confirmPassword: ''
    });
    const navigate = useNavigate();
    const [token, setToken] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    useEffect(() => {
        const queryParams = queryString.parse(window.location.search);
        const tokenParam = queryParams.token;
        setToken(tokenParam || '');
      }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(token)
        setIsLoading(true);
        const { newPassword, confirmPassword } = formData;

        // Check if passwords match
        if (newPassword !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/user/auth/reset-password?token=${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ password:newPassword })
            });

            const res = await response.json();
            if (res.code === 200) {
                toast.success(res.message);
                navigate('/login');

            }
            else if (res.code === 401) {
                toast.error(res.message);
            }
            // Redirect or perform additional actions after successful reset
        } catch (error) {
            // Handle error
            console.error('Password reset error:', error.message);
            toast.error(error.message || 'Password reset failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-6 text-center text-2xl font-bold leading-9 text-gray-900">
                    Reset Your Password
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium leading-5 text-gray-700">
                            New Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="newPassword"
                                name="newPassword"
                                type="text"
                                value={formData.newPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium leading-5 text-gray-700">
                            Confirm Password
                        </label>
                        <div className="mt-1">
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="text"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                autoComplete="new-password"
                                required
                                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                            {isLoading ? 'Please wait...' : 'Reset Password'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
