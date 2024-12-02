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

export function FlashSale({ data = [], addToWishList, heading }) {

  console.log("Data received:", heading);
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll();

  const [products, setProducts] = useState([]);
  const [targetDate, setTargetDate] = useState('');

  useEffect(() => {
    if (data) {
      setProducts(data);
      setTargetDate('2024-11-27T23:59:59');
    }
  }, [data]);

  const handleAddToWishList = (product, id) => {
    console.log("data===============>>", data);
    addToWishList(product, id);
  };

  // const toggleFavorite = (id) => {  
  //   setProducts((prevProducts) =>
  //     prevProducts.map((product) =>
  //       product.id === id ? { ...product, wishlist: !product.wishlist } : product
  //     )
  //   );
  // };

  return (
    <div className="flex flex-col  max-lg:px-4  pt-20 overflow-hidden">
      <div className="flex lg:px-20 ju">
        <div className="bg-red-600 w-2 rounded-sm"></div>
        <p className="text-red-600 font-body pl-4">{heading==="topsellingproduct"?"This Month":"Today's"}</p>
      </div>

      <div className="flex max-md:flex-col lg:px-20 justify-between">
        <div className="flex flex-row max-md:flex-col ">
          <p className="text-custom_h6  font-body pr-28">{heading==="topsellingproduct"?"Best Selling Products":"Flash Sales"}</p>

         {targetDate>0 && heading!="topsellingproduct" && <CountdownTimer targetDate={targetDate} />}
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
            <div className="flex  lg:pl-20 lg:pr-20 lg:flex-row gap-x-4 items-center">
              {products.map((product) => (
                <Products
                  key={product.id}
                  id={product.id}
                  brand={product.name}
                  isFavorite={product.wishlist}
                  image={product.image}
                  toggleFavorite={handleAddToWishList}
                  rating={product.avg_rating}
                  mrp={product.mrp}
                  selling_price={product.selling_price}
                  discount_value={product.discount_value}
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

function RatingReview({ rating }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (
          <span
            className="start"
            style={{
              cursor: "pointer",
              color: rating >= star ? "gold" : "gray",
              fontSize: `15px`,
            }}
          >
            {" "}
            ★{" "}
          </span>
        );
      })}
    </div>
  );
}

function Products({
  id,
  brand,
  isFavorite,
  image,
  toggleFavorite,
  rating,
  mrp,
  selling_price,
  discount_value,
  product,
}) {
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/productDetails/${id}`);
  };

  const addToCart = async (id) => {
    try {
      const cartData = {
        product_id: id,
        qty: 1,
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

  return (
    <div className="flex flex-col w-full lg:pt-10">
      <div>
        <div className="relative z-10 group rounded-lg bg-gray-50 w-60 max-lg:w-48 items-center justify-center">
          <img
            className="object-contain w-full h-44  p-6 bg-transparent mix-blend-multiply "
            src={image}
            onClick={handleProductClick}
            alt="Product"
          />
          <img
            onClick={() => toggleFavorite(product, id)}
            src={
              !isFavorite
                ? require("../assets/images/Fill Heart.png")
                : require("../assets/images/heart.png")
            }
            className={`w-8 h-8 absolute top-0 right-0 mt-3 mr-2 transition-all ${
              isFavorite ? "w-5 mt-5 mr-4 h-5" : "w-8 mt-5 mr-4"
            }`}
            alt="Favorite Icon"
          />
          <p className="absolute rounded px-2 py-0.5 top-3 left-3 font-body text-white bg-red-600 text-sm">
            -{discount_value}%
          </p>
          <p
            onClick={() => addToCart(id)}
            className="lg:invisible text-center font-body active:bg-red-600 rounded-b-lg p-2 bg-black text-white lg:group-hover:visible"
          >
            Add to cart
          </p>
        </div>
        <p className="font-body pt-2 truncate">{brand}</p>
        <p className="font-body text-sm font-normal text-red-600">
          Rs {parseFloat(selling_price).toFixed(2)}{" "}
          <span className="line-through text-gray-600">{mrp}</span>
        </p>
        <RatingReview rating={rating} />
      </div>

      {product ? <div></div> : <Skeleton height={140} />}
    </div>
  );
}

export default FlashSale;
