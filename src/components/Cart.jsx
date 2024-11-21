import React, { useState, useEffect } from 'react';
import { postApi } from '../api/apiService';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useNavigate } from 'react-router-dom';


export default function Cart() {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [quantities, setQuantities] = useState({}); 
  const [isLoading, setIsLoading] = useState(false);


  const productDetails = async () => {
    setIsLoading(true); 
    try {
      const producatData = await postApi("api/get_cart");
      if (producatData.success) {
        setCartData(producatData.data);
  
        if (Array.isArray(producatData.data)) {
          const total = producatData.data.reduce((sum, item) => {
            return sum + (item?.product_cart_total ? parseFloat(item.product_cart_total) : 0);
          }, 0);
          setSubtotal(total.toFixed(2));
        } else {
          console.error("Expected an array but got:", producatData.data);
        }
      } else {
        console.error("Error during product data fetch:", producatData?.message || "Unknown error");
      }
    } catch (err) {
      console.error("Error during product data fetch:", err);
    } finally {
      setIsLoading(false); 
    }
  };
  


  useEffect(() => {
    window.scrollTo(0, 0);
    productDetails();
  }, []);


  const updateCart = async (id, product_id, quantities) => {
    try {
      const updateData = {
        product_id,
        qty: quantities,
      };

      const producatData = await postApi(`api/update_cart/${id}`, updateData);

      console.log("producatData:", producatData);

      if (producatData.success) {
        toast.success(producatData.message);
      
        await productDetails();
      } else {
        toast.error(producatData.message || "Failed to update cart");
      }
    } catch (err) {
      console.error("Error during product data fetch:", err);
      toast.error("An error occurred while updating the cart.");
    }
  };


  const removeCartItem = async (id) => {
    try {
     

      const removeData = await postApi(`api/remove_cart/${id}`);

      console.log("producatData:", removeData);

      if (removeData.success) {
        toast.success(removeData.message);
        await productDetails();
      } else {
        toast.error(removeData.message || "Failed to update cart");
      }
    } catch (err) {
      console.error("Error during product data fetch:", err);
     
    }
  };


  const increment = async (id, product_id, qty) => {
    const newQuantity = (quantities[id] || qty) + 1; 
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  
    try {
      await updateCart(id, product_id, newQuantity);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  
  
  const decrement = async (id, product_id, qty) => {
    const currentQuantity = quantities[id] || qty;
    const newQuantity = currentQuantity - 1;
    if (newQuantity < 1) {
      toast.warning("Quantity cannot be less than 1");
      return;
    }
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [id]: newQuantity,
    }));
  
    try {

      await updateCart(id, product_id, newQuantity);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };
  

  return (
    <div className='flex flex-col  max-lg:mx-5 lg:mx-20 font-body pt-10 pb-20'>
      <div className='grid grid-cols-4 justify-between border items-center  shadow-lg rounded-lg px-5 py-5'>
        <p className='text-sm'>Product</p>
        <p className='text-sm text-center'>Price</p>
        <p className='text-sm text-center'>Quantity</p>
        <p className='text-sm text-right'>Subtotal</p>
      </div>

      {cartData ? (
        <CartItem
          cartList={cartData}
          increment={increment}
          decrement={decrement}
          quantities={quantities}
          removeCartItem = {removeCartItem}
          />
      ) : (
        isLoading?
        <div className='mt-6'>
          <Skeleton
            count={12}
            height={40}
            className="mb-5  rounded-lg border"
            style={{ padding: "20px" }}
          />
        </div>:<h1 className='text-custom_h5 text-center py-10 text-gray-300'>No Data Found</h1>
      )}

      <div className='flex justify-between'>
      <CommonBtn label="Return To Shop" clicked={() => navigate('/')} />

        <CommonBtn label="Update Cart" />
      </div>

      {cartData && (
        <div className="flex max-md:flex-col w-full justify-between pt-10 gap-5 text-sm overflow-hidden">
          <div className="flex  max-lg:flex-col  items-start gap-3 text-sm w-full">
            <input
              type="text"
              className="border rounded px-5 py-2 text-sm pr-10"
              placeholder="Coupon Code"
            />
            <CommonBtn label="Apply Coupon" bgColor="red-600" textColor="white" />
          </div>

          <div className="border border-black flex flex-col w-full px-16 py-2">
            <p className='text-lg text-black py-2'>Cart Total</p>
            <div className="flex justify-between text-sm py-2 ">
              <p>Subtotal:</p>
              <p>${subtotal}</p>
            </div>

            <hr />

            <div className="flex justify-between text-sm py-2">
              <p>Shipping:</p>
              <p>Free</p>
            </div>

            <hr />

            <div className="flex justify-between text-sm py-2 pb-10">
              <p>Total:</p>
              <p>${subtotal}</p>
            </div>

            <div className='lg:mx-24'>
              <CommonBtn label="Proceed to checkout" bgColor="red-600" textColor="white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function CommonBtn(props) {
  return (
    <div 
      onClick={props.clicked}  // Directly pass the clicked function here
      className={`hover:scale-105 duration-300 text-center cursor-pointer px-5 py-2 border rounded text-sm bg-${props.bgColor} text-${props.textColor}`}
    >
      {props.label}
    </div>
  );
}

function CartItem(props) {
  const list = props.cartList;
  if(list){
  const listItems = list.map((item) => (
    <>
    <div key={item.id} className='relative grid grid-cols-4 items-center flex-row w-full mb-5 shadow-lg rounded-lg border px-5 py-5'>
      <div className="flex items-center ">
        <img className='w-8 h-8 object-contain' src={item.image} />
        <p className='pl-2 text-sm truncate'>{item.name}</p>
      </div>
      <p className='text-sm max-md:pl-4 text-center'>${parseFloat(item.selling_price).toFixed(2)}</p>
      <div className='flex items-center justify-center text-center'>
        <div className='flex w-15 flex-row rounded border items-center justify-center px-2'>
          <p className='text-sm pr-2'>{item.qty}</p> {/* Show quantity for this item */}
          <div className='flex flex-col justify-center'>
            <img onClick={() => props.decrement(item.id,item.product_id,item.qty)} className='w-3 h-3 ' src={require('../assets/images/Drop-Up-Small.png')} />
            <img onClick={() => props.increment(item.id,item.product_id,item.qty)} className='w-3 h-3' src={require('../assets/images/Drop-Down-Small.png')} />
          </div>
        </div>
      </div>
      <p className='text-sm pr-6 text-right'>${parseFloat(item.product_cart_total).toFixed(2)}</p>
      <img onClick={()=> props.removeCartItem(item.id)}  src={require('../assets/images/icon-cancel.png')} className='w-6 h-6 absolute right-[-10px] top-[-13px]  ' alt="" />
    </div>
    
    </>
  ));
  return <div className='flex flex-col mt-3 items-center'>{listItems}</div>;
}

 
}
