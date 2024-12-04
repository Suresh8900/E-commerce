import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { About } from "./pages/About";
import { HeaderComponent } from "./components/HeaderComponent";
import { SignUp } from "./pages/SignUp";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Loader from "./utilities/loader";
import { setNavigateFunction } from "./utilities/navigationHelper";
import { AppProvider } from "./utilities/AppContext";
import BillingDetails from "./pages/BillingDetails";
import NetworkStatus from './utilities/NetworkStatus';
function App() {
  const [searchText, setSearchText] = useState("");

  const SetupNavigation = () => {
    const navigate = useNavigate();
    useEffect(() => {
      setNavigateFunction(navigate);
    }, [navigate]);
    return null;
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const loadApp = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    loadApp();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
   <NetworkStatus />
    <AppProvider>
      <Router>
        <SetupNavigation />
        <nav>
          <HeaderComponent
            setSearchText={setSearchText}
            searchText={searchText}
          />{" "}
          <ToastContainer autoClose={1000} />{" "}
        </nav>{" "}
        <Routes>
          <Route path="/signup" element={<SignUp />} />{" "}
          <Route path="/signin" element={<SignUp />} />{" "}
          <Route path="/about" element={<About />} />{" "}
          <Route path="/productDetails/:id" element={<ProductDetails />} />{" "}
          <Route path="/addToCart" element={<Cart />} />{" "}
          <Route path="/home" element={<Home searchText={searchText} />} />
          <Route path="/" element={<BillingDetails/>} />
        </Routes>{" "}
      </Router>{" "}
    </AppProvider>
    </>
  );
}

export default App;
