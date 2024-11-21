import React, { useState,useEffect } from 'react'
import axiosInstance from '../api/AxiosInstance';
import { postApi } from '../api/apiService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import FlashSale from './FlashSale';

export default function ProductDetails() {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [selectedButton, setSelectedButton] = useState(1);
    // const sizes =[]
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState(null); 
    const [quantity, setQuantity] = useState(1); 
    const [productData, setProductData] = useState(null);


    function showToast(message, type = "success") {
        if (type == "success") {
          toast.success(message);
        } else {
          toast.error(message);
        }
      }
    

      const addToCart = async (id,color) => {
        try {
          const cartData = {
            product_id: id,
            qty: quantity,
            size:selectedSize,
            colour:color,
          };
          console.log("PAYLOAD", cartData);
          const addToCartData = await postApi("api/add_to_cart", cartData);
    
          if (addToCartData.success) {
            toast.success(addToCartData.message, { autoClose: 1000 });
            navigate("/addToCart");
          } else {
            toast.error(addToCartData.message);
          }
        } catch (err) {
          console.error("Error during producat data fetch:", err);
        }
      };

     useEffect(() => {
    const productDetails = async () => {
      try {
        const user = {}; 
        const producatData = await postApi(`api/get_product_by_id/${id}`);
  
        if (producatData.success) {
          showToast(producatData.message);
          setProductData(producatData.data)
         
          if (producatData.data.size) {
            const sizesArray = producatData.data.size.split(",");
            setSizes(sizesArray);
            setSelectedSize(sizesArray[0]); 
        }
            
        } else {
          showToast(producatData.message,"error");
        }
      } catch (err) {
        console.error("Error during producat data fetch:", err);
        showToast("An error occurred while fetching producat data.");
      }
    };
  
    productDetails();
  }, []);








    const increment =()=>{
        setQuantity(prev=>prev+1);
    }

    const decrement =()=>{
        if (quantity > 1) {
          setQuantity(prev=>prev-1);
        }
    }

    const handleSizeClick = (size) => {
      setSelectedSize(size); 
      console.log("Selected Size:", size); 
   
    };

  return ( productData && (<>
      <div className='flex pb-20 lg:flex-row max-lg:flex-col lg:px-20 max-lg:px-6 mt-20 font-body overflow-hidden'>
        <div className='hidden lg:flex flex-col w-96 items-center overflow-hidden'>
          <div className='p-4 bg-F5F5F5 rounded m-2'>
            <img src={require('../assets/images/image 63.png')} className='w-full max-h-24 object-contain' />
          </div>
          <div className='p-4 bg-F5F5F5 rounded m-2'>
            <img src={require('../assets/images/image 63.png')} className='w-full max-h-24 object-contain' />
          </div>
          <div className='p-4 bg-F5F5F5 rounded m-2'>
            <img src={require('../assets/images/image 63.png')} className='w-full max-h-24 object-contain' />
          </div>
          <div className='p-4 bg-F5F5F5 rounded m-2'>
            <img src={productData.sap_image} className='w-full max-h-24 object-contain bg-transparent mix-blend-multiply' />
          </div>
        </div>

        <div className='w-full bg-F5F5F5 rounded lg:m-2 flex justify-center items-center overflow-hidden'>
          <img src={productData.image} className='p-10 max-h-full object-contain bg-transparent mix-blend-multiply' />
        </div>

        <div className='flex flex-col lg:pl-10 w-full justify-between overflow-hidden max-lg:pt-5'>
          <h1 className='text-custom_h6 '>{productData.name}</h1>
          <div className='flex items-center text-sm pt-1'>
            <img src={require('../assets/images/Five star.png')} className='h-5' alt="" />
            <p className='pl-2 pr-3 text-gray-400'>(150 Reviews)</p>
            <p className='text-green00FF66 pl-2'>| In Stock</p>
          </div>
          <h1 className='text-custom_h5 font-normal pt-4'>{`$${parseFloat(productData.selling_price).toFixed(2)}`}</h1>
          <p className='text-sm font-normal leading-6 pt-4'>{parse(productData.description)}</p>

          <hr className='my-6' />


          <div className="flex gap-4 items-center">
            <p>Colors :</p>
            <button onClick={() => setSelectedButton(1)} className={`w-4 h-4 rounded-full ${selectedButton === 1 ? "bg-blue-500 text-white ring-2 ring-black ring-offset-2 ring-offset-white" : "bg-blue-500"}`}></button>
            <button onClick={() => setSelectedButton(2)} className={`w-4 h-4 rounded-full ${selectedButton === 2 ? "bg-DB4444 text-white ring-2 ring-black ring-offset-2 ring-offset-white" : "bg-DB4444"}`}></button>
          </div>


          <div className="flex mt-5 items-center">
            <p className='pr-2'>Size: </p>
            <div className="flex gap-x-2">
              {sizes.map((size, index) => (
                <button onClick={() =>
                 handleSizeClick(size)}
                  key={index}
                  className={`uppercase px-3 py-1 border rounded text-center
                    ${selectedSize === size ? "bg-DB4444 text-white" : "hover:bg-gray-200"}
                     transition-all`}>
                  {size}
                </button>
              ))
           
              }
            </div>
          </div>


          <div className="flex mt-5 gap-4 items-center text-sm">
            <div className='flex border rounded justify-between'>
              <p onClick={decrement} className='px-4 py-2 border-r'>-</p>
              <p className='px-6 py-2'>{quantity}</p>
              <p onClick={increment} className='text-white bg-DB4444 px-4 py-2'>+</p>
            </div>
            <button onClick={()=>addToCart(productData.id,productData.colour)} className='bg-DB4444 text-white px-6 py-2 rounded'>Buy Now</button>
            <img src={require('../assets/images/Frame 904.png')} className='h-9 w-9' alt="" />
          </div>

          <div className="flex flex-col border mt-5 rounded text-sm">
            <div className='flex gap-x-5 items-center p-2'>
              <img src={require('../assets/images/icon-delivery.png')} className='h-8 w-8' alt="" />
              <div>
                <p>{productData.delivery_price==0? "Free Delivery":"$"+productData.delivery_price+ " Delivery Charges"} </p>
                <p>Enter your postal code for Delivery Availability</p>
              </div>
            </div>
            <div className='flex gap-x-5 items-center border-t p-2'>
              <img src={require('../assets/images/Icon-return.png')} className='h-8 w-8' alt="" />
              <div>
                <p>Return Delivery</p>
                <p>Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>


          
      </div>

             
      </>

   ) 
   
  );

}
