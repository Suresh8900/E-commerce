import CountdownTimer from "./CountdownTimer";
import React, { useRef, useState } from "react";
import { useHorizontalScroll } from "./useHorizontalScroll";
import { useEffect } from "react";
import { postApi } from "../api/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import ProductDetails from "./ProductDetails";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function ByCategory({ data = []}) {

  console.log("Data received:", data);
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);




  return (
    <div className="flex flex-col  max-lg:px-4  pt-20 overflow-hidden">
      <div className="flex lg:px-20 ju">
        <div className="bg-red-600 w-2 rounded-sm"></div>
        <p className="text-red-600 font-body pl-4">Categories</p>
      </div>

      <div className="flex max-md:flex-col lg:px-20 justify-between">
        <div className="flex flex-row max-md:flex-col ">
          <p className="text-custom_h6  font-body pr-28">Browse By Category</p>

        
        </div>

        <div className="invisible md:visible  lg:visible  flex flex-row">
          <img
            src={require("../assets/images/Fill With Left Arrow.png")}
            onClick={scrollLeft}
            className="h-8 w-8 mr-5"
          />

          <img
            src={require("../assets/images/Fill with Right Arrow.png")}
            onClick={scrollRight}
            className="h-8 w-8"
          />
        </div>
      </div>

      <div className="">
        <div ref={scrollRef} className=" overflow-auto lg:flex  scrollbar-hide">
          {products.length > 0 ? (
            <div className="flex max-lg:grid lg:pt-10 max-lg:grid-cols-2 w-full  justify-center max-lg:px-1  items-center">
              {products.map((product) => (
                <Products
                  key={product.id}
                  id={product.id}
                  brand={product.name}
                  image={product.image}
                  product={product} 
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <Skeleton
                  key={index}
                  height={140}
                  className="w-full rounded-lg"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



function Products({
  id,
  brand,
  image,
  product,
}) {


  return (
    <div className="text-sm font-body">
  <div className="flex border hover:bg-red-600 hover:text-white rounded flex-col items-center justify-center mx-2 my-2 m min-h-32 min-w-32 p-4   lg:h-32 lg:w-32">
    <img src={image} className="w-10 h-10 object-contain" alt="" />
    <p className="pt-5 text-center">{brand}</p>
  </div>
  {/* {product ? (
    <div></div>
  ) : (
    <Skeleton height={140} width={160} /> {/* Add a width for consistency */}
  {/* )} */} 
</div>

  );
}

export default ByCategory;



