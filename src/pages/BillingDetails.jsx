import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postApi } from "../api/apiService";
import CommonBtn from "../utilities/CommanBtn";

export default function BillingDetails() {
  const [getAllOrder, setAllOrder] = useState([]);
  const [getAddress, setAllAddress] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchCartData = async () => {
      try {
        const cartData = await postApi("api/get_cart");
        const total = getAllOrder.reduce((sum, item) => {
          return sum + (item?.product_cart_total ? parseFloat(item.product_cart_total) : 0);
        }, 0);
        setSubtotal(total.toFixed(2));
        if (cartData.success) {
          setAllOrder(cartData.data);
          toast.success(cartData.message);
        } else {
        }
      } catch (err) {
        console.error("Error during dashboard data fetch:", err);
        toast.error("An error occurred while fetching dashboard data.");
      }
    };

    fetchCartData();
  }, []);

  useEffect(() => {
    const fetchAddressData = async () => {
      try {
        const addressData = await postApi("api/get_all_user_address");

        if (addressData.success) {
          setAllAddress(addressData.data);
          toast.success(addressData.message);
        } else {

        }
      } catch (err) {
        console.error("Error during cart data fetch:", err);
        toast.error("An error occurred while fetching cart data.");
      }
    };

    fetchAddressData();
  }, []);

  let item = "";
  if (getAddress) {
    item = getAddress.find(function (element) {
    return element;
    });
  }

  return (
    <div className="lg:px-20  md:px-10 px-4 pb-10 ">
      <h1 className="text-2xl pt-4">Billing Details</h1>
      <div className="pt-10 flex max-md:flex-col">
        <div className="font-body w-full flex flex-col lg:pr-20 md:pr-5 text-[14px]">
          <p className="">
            First Name<span className="text-red-500">*</span>
          </p>
          <input
            className="px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8"
            value={item?.name}
          />

          <p className="pt-8">Company Name</p>
          <input
            className="px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8"
            value={item?.name}
          ></input>

          <p className=" pt-8">
            Street Address<span className="text-red-500">*</span>
          </p>
          <input
            className="px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8"
            value={item?.address}
          ></input>

          <p className=" pt-8">
            Apartment, floor, etc. (optional)
            <span className="text-red-500">*</span>
          </p>
          <input
            className="px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8"
            value={item?.house_no}
          ></input>

          <p className=" pt-8">
            Town/City<span className="text-red-500">*</span>
          </p>
          <input
            className="px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8"
            value={item?.city}
          ></input>

          <p className=" pt-8">
            Phone Number<span className="text-red-500">*</span>
          </p>
          <input
            className="px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8"
            value={item?.mobile}
          ></input>

          <p className=" pt-8">
            Email Address<span className="text-red-500">*</span>
          </p>
          <input
            className="px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8"
            value={item?.email}
          ></input>

          <div className="flex pt-4 flex-row items-center">
            <input type="checkbox" className="outline-none checked:bg-red-500  focus:ring-transparent border-red-500 rounded" name="" id="" />
            <p className="pl-2 ">Save this information for faster check-out next time</p>
          </div>

        </div>

        <div className="flex flex-col w-full  max-md:pt-10  lg:pl-20 md:pl-5 text-[14px]">
          {getAllOrder.map((item) => (
            <div
              key={item.id}
              className="flex flex-row justify-between text-center items-center pt-4"
            >
              <div className="flex text-center items-center">
                <img
                  src={item.image?item.image:require('../assets/images/a_developer.jpeg')}
                  alt={item.name}
                  
                  className="w-10 h-10 mr-4 object-contain"
                  onError={() => require('../assets/images/a_developer.jpeg')}  
                />
                <p>{item.name}</p>
              </div>
              <p>{parseFloat(item.product_cart_total).toFixed(2)}</p>
            </div>


          ))}

      <div className="flex flex-col w-full">
            
            <div className="flex justify-between text-sm py-2 ">
              <p>Subtotal:</p>
              <p>${subtotal}</p>
            </div>

            <hr />

            <div className="flex justify-between text-sm py-2">
              <p>Shipping:</p>
              <p>Free</p>
            </div>

            <hr/>

            <div className="flex justify-between text-sm py-2 pb-10">
              <p>Total:</p>
              <p>${subtotal}</p>
            </div>

            
          </div>
          <div className="pt-6 lg:w-1/2">
            <CommonBtn
              label="Place Order"
              bgColor="red-600"
              textColor="white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
