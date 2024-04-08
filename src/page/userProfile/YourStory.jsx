import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BASE_URL } from '@/config/config';
import { useDispatch } from 'react-redux';
import { updatePost } from '@/service/postSlice';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const YourStory = () => {
   
    const [formData, setFormData] = useState({
        caption: '',
        image: '',
        text: ''
    });

    const PopupRef = useRef();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [storyData,setStoryData]=useState([])
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({ ...formData, image: reader.result });
        };
        reader.readAsDataURL(file);
    };

    const handleCreateStory = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/story/createStory`, {
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
                setStoryData([...storyData, res.data]); 
                     PopupRef.current.click();
            }
            else if (res.code === 401) {
                toast.error(res.message);
                navigate('/login');
            }
            else if (res.code === 400) {
                toast.error(res.message);
            }


        } catch (error) {
            // Handle error
            console.error('Update error:', error.message);
            toast.error(error.message || 'Update failed');
        } finally {
            setIsLoading(false);
        }
    };


    
   

    const GetStory = async () => {
      
        setIsLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/story/getUserStory`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('authToken')}`
                },
            });

            const res = await response.json();

            if (res.code === 200) {
                toast.success(res.message);
                setStoryData(res.data);
                
               
            }
            else if (res.code === 401) {
                toast.error(res.message);
                navigate('/login');
            }
            else if (res.code === 400) {
                toast.error(res.message);
            }


        } catch (error) {
            // Handle error
            console.error('Update error:', error.message);
            toast.error(error.message || 'Update failed');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        GetStory();  
    },[])
  
    console.log(storyData)
    return (
        <div className="p-4 h-[100vh]">
            <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold mb-4">Your Stories</h1>
            <div className="text-center">
                    <Dialog>
                        <DialogTrigger ref={PopupRef}>
                          <Button>Create Story</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Create a new story</DialogTitle>
                            </DialogHeader>
                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                                <form className="space-y-6" onSubmit={handleCreateStory}>
                                    <div>
                                        <label htmlFor="caption" className="block text-sm font-medium leading-6 text-gray-900">
                                            Caption
                                        </label>
                                        <div className="mt-2">
                                            <input
                                                id="caption"
                                                name="caption"
                                                type="text"
                                                placeholder='Enter your caption'
                                                onChange={handleChange}
                                                value={formData.caption}
                                                autoComplete="caption"
                                                required
                                                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="image" className="block text-sm font-medium leading-6 text-gray-900">
                                            Image
                                        </label>
                                        <div className="mt-2">

                                            <input
                                                accept="image/*"
                                                id="image"

                                                type="file"
                                                onChange={handleFileInputChange}

                                                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                            About story
                                        </label>
                                        <div className="mt-2">
                                            <textarea
                                                id="text"
                                                name="text"
                                                rows={4}
                                                placeholder='Write something about your story here'
                                                onChange={handleChange}
                                                value={formData.text}
                                                autoComplete="text"
                                                className="block w-full rounded-md border-0 px-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            ></textarea>
                                        </div>
                                    </div>



                                    <div>
                                        <Button
                                            type="submit"
                                            className="flex w-full justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                        >
                                            {isLoading ? 'Please wait..' : 'Create Story'}
                                        </Button>
                                    </div>
                                </form>


                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
             </div>
               { storyData.length>0 && <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {storyData.map(story => (
                        <div key={story._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
                            <img src={story.image} alt={story.caption} className="w-full h-40 object-cover rounded-md mb-2" />
                            <h2 className="text-lg font-semibold mb-2">{story.caption}</h2>
                            <p className="text-gray-600 mb-2">{story.text}</p>
                            <div className="flex items-center">
                                <img src={story.author.profilePicture} alt={story.author.username} className="w-8 h-8 rounded-full mr-2" />
                                <p className="text-sm">{story.author.username}</p>
                            </div>
                        </div>
                    ))}
            </div>}
            
            {
                storyData.length ===0 && <div className="text-center text-2xl">No story to display</div>
            }
        
               
           
        </div>
    );
};

export default YourStory;
