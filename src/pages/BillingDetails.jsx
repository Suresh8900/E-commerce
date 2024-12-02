import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { postApi } from '../api/apiService';
import CommonBtn from '../utilities/CommanBtn';

export default function BillingDetails() {

    const list = [{id:1,name:"Lotus"},{id:1,name:"Lotus"},{id:1,name:"Lotus"},{id:1,name:"Lotus"},{id:1,name:"Lotus"},{id:1,name:"Lotus"}]
    const [getAllOrder,setAllOrder] = useState([])
    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchDashboardData = async () => {
          try {
            
            const dashboardData = await postApi("api/get_cart");
    
            if (dashboardData.success) {
                setAllOrder(dashboardData.data)
              
                toast.success(dashboardData.message);
             
            } else {
             
            }
          } catch (err) {
            console.error("Error during dashboard data fetch:", err);
            toast.error("An error occurred while fetching dashboard data.");
          }
        };
    
        fetchDashboardData();
      }, []);
    
   return (
    <div className='lg:px-20  md:px-10 px-4 pb-10'>   
     <h1 className='text-2xl pt-4'>Billing Details</h1>
     <div className='pt-10 flex max-md:flex-col'>
     <div className='font-body w-full flex flex-col lg:pr-20 md:pr-5'>
     <p className='text-small1  '>First Name<span className='text-red-500'>*</span></p>
        <input className='px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8' ></input>

        <p className='text-small1 pt-8'>Company Name</p>
        <input className='px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8' ></input>


        <p className='text-small1 pt-8'>Street Address<span className='text-red-500'>*</span></p>
        <input className='px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8' ></input>


        <p className='text-small1 pt-8'>Apartment, floor, etc. (optional)<span className='text-red-500'>*</span></p>
        <input className='px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8' ></input>


        <p className='text-small1 pt-8'>Town/City<span className='text-red-500'>*</span></p>
        <input className='px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8' ></input>

        <p className='text-small1 pt-8'>Phone Number<span className='text-red-500'>*</span></p>
        <input className='px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8' ></input>


        <p className='text-small1 pt-8'>Email Address<span className='text-red-500'>*</span></p>
        <input className='px-3 mt-1 rounded outline-none bg-[#F5F5F5] h-8' ></input>
    </div>

    <div className='flex flex-col w-full  max-md:pt-10  lg:pl-20 md:pl-5'>

                {
                    getAllOrder.map((item) => (
            
                        <div key={item.id} className="flex flex-row justify-between text-center items-center pt-4">
                        <div className="flex text-center items-center" >
                            <img src={item.image} alt={item.name} className="w-10 h-10 mr-4 object-contain" />
                            <p>{item.name}</p>
                        </div>
                        <p>${item.selling_price}</p> 
                        </div>
                
                    ))
                 }
                <div className='pt-6 lg:w-1/2'>
                    <CommonBtn label="Place Order" bgColor="red-600" textColor="white" />
                </div>
      </div>
     </div>
    </div>

  )
}
