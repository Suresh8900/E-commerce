import React, { createContext, useState,useEffect } from 'react';
import { postApi } from '../api/apiService';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {

  const [cartBadgeCount, setCartBadgeCount] = useState(0);
  const productDetails = async () => {
    try {
      const producatData = await postApi("api/get_cart");
      if (producatData.success) {
        if (Array.isArray(producatData.data)) {
          const itemCount = producatData.data.length;
          console.log("cart:", producatData.data);
          console.log("Total number of items in the cart:", itemCount);
          
          if(itemCount){
            setCartBadgeCount(itemCount);
          }else{
            setCartBadgeCount(0);
          }
        } else {
          console.error("Expected an array but got:", producatData.data);
        }
      } else {
        console.error("Error during product data fetch:", producatData?.message || "Unknown error");
      }
    } catch (err) {
      console.error("Error during product data fetch:", err);
    }
  };
  
  useEffect(() => {
    productDetails(); 
  }, []);


  return (
    <AppContext.Provider value={{ 
      cartBadgeCount, 
      setCartBadgeCount,
  
    }}>
      {children}
    </AppContext.Provider>
  );
};
