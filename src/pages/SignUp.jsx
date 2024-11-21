import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { postApi } from "../api/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSignIn = location.pathname === "/signin";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("9828282828");
  const [gender, setGender] = useState("male");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    console.log("url of image:========>>>>", selectedFile);
  
  };
  function showToast(message, type = "success") {
    if (type == "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  }

  const signUpApiCaller = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("mobile", mobile);
      formData.append("gender", gender);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const registerUser = await postApi("api/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (registerUser.success) {
        showToast(registerUser.message);
        navigate("/signin");
      } else {
        showToast(registerUser.message, "error");
      }
    } catch (err) {
      console.error("Error during sign-up:", err);
    }
  };

  const signInApiCaller = async (event) => {
    event.preventDefault();
    try {
      const user = { email: loginEmail, password: loginPassword };
      const loginUser = await postApi("api/login", user);
      if (loginUser.success) {
        localStorage.setItem("userDetails", JSON.stringify(loginUser.data));
        localStorage.setItem("token", JSON.stringify(loginUser.data.token));
        showToast(loginUser.message);
        navigate("/");
      } else {
        showToast(loginUser.message);
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
    }
  };

  return (
    <div className="grid max-lg:grid-cols-1 lg:grid-cols-2 mt-14 mb-20">
      <img
        src={require("../assets/images/Side Image.png")}
        className="hidden lg:flex h-[500px] w-full"
      />

      {!isSignIn ? (
        <div className="flex flex-col lg:px-32 items-center max-lg:px-5 justify-center">
          <h1 className="text-custom_h6">Create an account</h1>
          <h5 className="text-small1">Enter your details below</h5>

          <form className="pt-10 max-w-md w-full">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                name="name"
                id="floating_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label
                htmlFor="floating_name"
                className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Name
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="floating_email"
                className="block py-2.5  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label
                htmlFor="floating_email"
                className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email or Phone Number
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>

            <div className="flex flex-row pb-4 items-center justify-start">
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {preview && (
                <img
                  className="w-12 h-12 object-cover rounded-full"
                  src={preview}
                  alt="Selected Preview"
                />
              )}
            </div>

            <button
              onClick={signUpApiCaller}
              type="submit"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-regular rounded text-sm w-full px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Create Account
            </button>
            <div className="border-2 p-2 rounded flex justify-center mt-3">
              <img
                src={require("../assets/images/Icon-Google.png")}
                className="w-6 h-6 mr-2"
                alt="Google icon"
              />
              <p>Sign up with Google</p>
            </div>
            <h5 className="text-small1 text-center pt-5">
              Already have an account?{" "}
              <span onClick={() => navigate("/signin")} className="underline">
                Log in
              </span>
            </h5>
          </form>
        </div>
      ) : (
        <div className="flex flex-col lg:px-32 items-center max-lg:px-5 justify-center">
          <h1 className="text-custom_h6">Log in to Exclusive</h1>
          <h5 className="text-small1">Enter your details below</h5>

          <form className="pt-10 max-w-md w-full">
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="email"
                name="email"
                id="floating_email"
                className="block py-2.5  px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <label
                htmlFor="floating_email"
                className=" peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Email or Phone Number
              </label>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="password"
                name="password"
                id="floating_password"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=""
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <label
                htmlFor="floating_password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Password
              </label>
            </div>

            <div className="flex flex-row justify-between items-center pt-5">
              <button
                onClick={signInApiCaller}
                type="submit"
                className="text-white
             bg-red-700 hover:bg-red-800 
             focus:ring-4 focus:outline-none
              focus:ring-blue-300 font-regular rounded text-sm 
               px-5 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Log In
              </button>

              <h5 className="text-small1 text-center text-red-500">
                Forgot Password?
              </h5>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
