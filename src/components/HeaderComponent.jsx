import React, { useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
export function HeaderComponent() {
  
  //  const elementRef = useRef(null)

  //  const handleClick = () => {
    
  //    if (elementRef.current) {
  //      elementRef.current.style.display = 'block';

  //      console.log("Element's current text content:", elementRef.current.textContent);
  //    }
  //  };
 
  return (
    <>
    <div className="flex flex-row justify-between  max-lg:px-5 lg:px-20 pt-5 items-center">
      <img src={require("../assets/images/Logo.png")} className="h-6" />
      <div className="flex flex-row justify-between gap-x-12 max-lg:hidden  font-body">
      
        <nav className='flex flex-row justify-between gap-x-12 max-lg:hidden  font-body'>
          <Link className="text-sm " to="/">Home</Link>
          <Link className="text-sm " to="/about">About</Link>
          <Link className="text-sm " to="/contact">Contact</Link>
        </nav>
    
      </div>

      <div className=" flex  gap-x-2 items-center">
        <div class="relative">
          <input
            // ref={elementRef}
            type="text"
            id="search-input"
            className="group font-body max-lg:hidden bg-gray-100 border-none text-gray-900 text-sm  rounded-lg block w-full p-2 pl-4 pr-10 mr-12 focus:outline-none focus:ring-0"
            placeholder="What are you looking for?"
          />

          
          <span  className="absolute inset-y-0 right-1 flex items-center ">
            <svg
               
              xmlns="http://www.w3.org/2000/svg"
              class="max-md:h-5 max-md:w-5    h-4 w-4 text-dark"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M12.9 14.32a8 8 0 111.41-1.41l3.32 3.32a1 1 0 01-1.41 1.41l-3.32-3.32zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </div>

        <img src={require("../assets/images/Wishlist.png")} className="h-7 w-7"/>
        <img src={require("../assets/images/Cart1.png")} className="h-7 w-7"/>
      </div>
    
    </div>
      <hr className="mt-4"/>


      
      </>
  );
}
