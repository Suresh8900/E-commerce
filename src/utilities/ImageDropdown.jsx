import React, { useState, useEffect, useRef } from 'react';
import { postApi } from "../api/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';

export default function ImageDropdown() {
  const navigate = useNavigate()  
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const logoutApiCaller = async (event) => {
    event.preventDefault();
    try {
      const user = {};
      const token = JSON.parse(localStorage.getItem("token"));
      console.log("logged out", token);
      if (!token) {
         console.error("No token found, user is not authenticated");
        return;
      }
      const logoutUser = await postApi("api/logout", user);

      if (logoutUser.success) {
        console.log("Logout", logoutUser.success);
        console.log("logged out");
        localStorage.removeItem("userDetails");
        localStorage.removeItem("token");
        toast.success(logoutUser.message);
        navigate("/signup");
      } else {
        toast.error(logoutUser.message);
      }
    } catch (err) {
      console.error("Error during logout:", err);
    }
  };
 
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute z-10 top-6  inline-block" ref={dropdownRef}>
      {/* Trigger Image */}
      <div>
        <img
          src={require('../assets/images/bgImage.png')}
          alt="Dropdown trigger"
          className="cursor-pointer w-6 h-6 rounded-full"
          onClick={toggleDropdown}
        />
      </div>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2  max-lg:bg-black lg:bg-[#0000000A] backdrop-blur-xs   z-10 text-sm text-white rounded-lg shadow-lg overflow-y-auto"
          style={{ minWidth: '200px' }} // Ensures the dropdown has a minimum width
        >
          <ul className="py-2 px-4 gap-y-3 flex flex-col">
            <li>
              <div className="flex items-center gap-x-2">
                <img
                  src={require('../assets/images/user (1).png')}
                  className="h-5 w-5 "
                  alt="Logout Icon"
                />
                <h1>Manage My Account</h1>
              </div>
            </li>
            <li>
              <div className="flex items-center gap-x-2">
                <img
                  src={require('../assets/images/user (1).png')}
                  className="h-5 w-5 "
                  alt="Logout Icon"
                />
                <h1>My Order</h1>
              </div>
            </li>


            <li>
              <div className="flex items-center gap-x-2">
                <img
                  src={require('../assets/images/user (1).png')}
                  className="h-5 w-5 "
                  alt="Logout Icon"
                />
                <h1>My Cancellations</h1>
              </div>
            </li>


            <li>
              <div className="flex items-center gap-x-2">
                <img
                  src={require('../assets/images/user (1).png')}
                  className="h-5 w-5 "
                  alt="Logout Icon"
                />
                <h1>My Reviews</h1>
              </div>
            </li>



            <li>
              <div onClick={logoutApiCaller} className="flex items-center gap-x-2">
                <img
                  src={require('../assets/images/Vector.png')}
                  className="h-4 w-4 object-contain"
                  alt="Logout Icon"
                />
                <h1>Logout</h1>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
