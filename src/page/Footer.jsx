import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-200  bottom-0 w-full py-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-indigo-600">
              <p>&copy; 2024 Your Social Media Website</p>
            </div>
            <div className="flex mt-4 md:mt-0">
              <a href="#" className="text-indigo-600 hover:text-indigo-700 mr-4">About Us</a>
              <a href="#" className="text-indigo-600 hover:text-indigo-700 mr-4">Contact Us</a>
              <a href="#" className="text-indigo-600 hover:text-indigo-700">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
  )
}

export default Footer