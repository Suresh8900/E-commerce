import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { postApi } from "../api/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageDropdown from "../utilities/ImageDropdown";
import { AppContext } from "../utilities/AppContext";

export function HeaderComponent({ setSearchText, searchText }) {
  const { cartBadgeCount } = useContext(AppContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [icon, expandedIcon] = useState(false);
  const isLoggedIn = JSON.parse(localStorage.getItem("userDetails"));
  const [underlined, setUnderlined] = useState([true, false, false, false]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleClick = (index) => {
    const newUnderlined = underlined.map((_, i) => i === index);
    setUnderlined(newUnderlined);
    setIsMenuOpen(false);
  };

  function showToast(message) {
    toast.success(message);
  }

  useEffect(() => {
    const pathToIndex = {
      "/": 0,
      "/about": 1,
      "/contact": 2,
      "/signup": 3,
    };
    const newUnderlined = [false, false, false, false];
    const index = pathToIndex[location.pathname];
    if (index !== undefined) {
      newUnderlined[index] = true;
    }
    setUnderlined(newUnderlined);
  }, [location.pathname]);

  return (
    <>
      <div className="overflow-hidden flex flex-row justify-between max-lg:px-5 lg:px-20 pt-5 items-center">
        <img
          src={require("../assets/images/Logo.png")}
          className="hidden h-6 lg:flex hover:transition-all"
        />
    
        <div className="relative z-50">
          <img
            src={require("../assets/images/menu.png")}
            alt="Menu"
            className="hidden h-6 max-lg:flex cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />

          {/* Side Menu */}
          <div
            className={`  fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <button
              className="absolute top-4 right-4 text-lg text-white"
              onClick={() => setIsMenuOpen(false)}
            >
              X
            </button>

            <div className="mt-16 space-y-4 p-4 flex flex-col font-body ">
              <Link
                onClick={() => handleClick(0)}
                className={`${
                  underlined[0] ? "underline " : ""
                } cursor-pointer text-lg `}
                to="/"
              >
                Home
              </Link>
              <Link
                onClick={() => handleClick(1)}
                className={`${
                  underlined[1] ? "underline" : ""
                } cursor-pointer text-lg`}
                to="/about"
              >
                About
              </Link>
              <Link
                onClick={() => handleClick(2)}
                className={`${
                  underlined[2] ? "underline" : ""
                } cursor-pointer text-lg`}
                to="/contact"
              >
                Contact
              </Link>
              {!isLoggedIn && (
                <Link
                  onClick={() => handleClick(3)}
                  className={`${
                    underlined[3] ? "underline" : ""
                  } cursor-pointer text-lg`}
                  to="/signup"
                >
                  Sign Up
                </Link>
              )}
            </div>
          </div>

          {isMenuOpen && (
            <div
              className="fixed inset-0 ml-60 "
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>

        <div className="flex flex-row justify-between gap-x-12 max-lg:hidden font-body overflow-hidden">
          <nav className="flex flex-row justify-between gap-x-12 max-lg:hidden font-body overflow-hidden">
            <Link
              onClick={() => handleClick(0)}
              className={`${
                underlined[0] ? "underline" : ""
              } cursor-pointer text-sm`}
              to="/"
            >
              Home
            </Link>
            <Link
              onClick={() => handleClick(1)}
              className={`${
                underlined[1] ? "underline" : ""
              } cursor-pointer text-sm`}
              to="/about"
            >
              About
            </Link>
            <Link
              onClick={() => handleClick(2)}
              className={`${
                underlined[2] ? "underline" : ""
              } cursor-pointer text-sm`}
              to="/contact"
            >
              Contact
            </Link>
            {!isLoggedIn && (
              <Link
                onClick={() => handleClick(3)}
                className={`${
                  underlined[3] ? "underline" : ""
                } cursor-pointer text-sm`}
                to="/signup"
              >
                Sign Up
              </Link>
            )}
          </nav>
        </div>

        <div className="flex gap-x-2 ml-2 items-center">
          <div className="relative">
            <input
              type="text"
              id="search-input"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`font-body   bg-gray-100 border-none text-gray-900 text-sm rounded-lg block w-full p-2 pl-4 pr-10 mr-12 focus:outline-none focus:ring-0 ${
                icon ? "block transition ease-in-out delay-150" : "hidden"
              } lg:flex focus:outline-none focus:ring-0`}
              placeholder="What are you looking for?"
            />
            <span
              onClick={() => {
                if (window.innerWidth < 1024) {
                  expandedIcon(!icon);
                }
              }}
              className="absolute inset-y-0 right-1 flex items-center cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="max-md:h-5 max-md:w-5 h-4 w-4 text-dark"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.9 14.32a8 8 0 111.41-1.41l3.32 3.32a1 1 0 01-1.41 1.41l-3.32-3.32zM8 14a6 6 0 100-12 6 6 0 000 12z"
                  clipRule="evenodd"
                />
              </svg>
            </span>
          </div>

          <img
            src={require("../assets/images/Wishlist.png")}
            className="h-7 w-7"
          />
          <div className="relative">
            <img
              src={require("../assets/images/Cart1.png")}
              className="h-7 w-7"
              onClick={() => navigate("/addToCart")}
            />

            {/* Cart Badge */}
            {cartBadgeCount > 0 && (
              <div className="text-[10px] bg-red-600 w-5 h-5 rounded-full text-white absolute bottom-4 left-4 flex items-center justify-center">
                <p className="text-center">
                  {cartBadgeCount > 99 ? "+99" : cartBadgeCount}
                </p>
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <div className="mr-10 ">
              <ImageDropdown />
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <hr className="mt-3" />
    </>
  );
}
