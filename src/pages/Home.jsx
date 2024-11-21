import { HeaderComponent } from "../components/HeaderComponent";
import { TabCarousel } from "../components/TabCarousel";
import { FlashSale } from "../components/FlashSale";
import React, { useEffect, useState, memo } from "react";
import { useNavigate } from "react-router-dom";
import SearchList from "../components/SearchList";
import { postApi } from "../api/apiService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageDropdown from "../utilities/ImageDropdown";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ByCategory } from "../components/ByCategory";

const Home = memo(({ searchText }) => {
  const token = localStorage.getItem("token");
  const [categoryList, setCategoryList] = useState(null);
  const [productList, setProductList] = useState(null);
  const [bestSellingList, setBestSellingList] = useState(null);
  const [byCategoryList, setByCategoryList] = useState(null);
  const [results, setResults] = useState([]);
  const [heading,setHeading] = useState('');
  function showToast(message) {
    toast.success(message);
  }

  useEffect(() => {
    console.log("searchText", searchText);
    const fetchSearchResults = async () => {
      if (searchText.trim() !== "") {
        try {
          const input = searchText === "" ? null : searchText;
          const response = await postApi("/api/search_product", {
            input: searchText,
          });
          setResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      }
    };

    fetchSearchResults();
  }, [searchText]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const user = {};
        const dashboardData = await postApi("api/dashboard");

        if (dashboardData.success) {
          showToast(dashboardData.message);
          setCategoryList(dashboardData.data.categorylist);
          setProductList(dashboardData.data.discountedproduct);
          setBestSellingList(dashboardData.data.topsellingproduct)
          setByCategoryList(dashboardData.data.categorylist);
          const arrayNames = Object.keys(dashboardData.data);
          setHeading(arrayNames);
         
        } else {
          showToast(dashboardData.message);
        }
      } catch (err) {
        console.error("Error during dashboard data fetch:", err);
        showToast("An error occurred while fetching dashboard data.");
      }
    };

    fetchDashboardData();
  }, []);

  const addToWishList = async (product, id) => {
    try {
      console.log("Product ID:", id);

      const response = await postApi(`api/add_to_wishlist/${id}`);
      if (response.success) {
        setProductList((prevData) =>
          prevData.map((item) =>
            item.id === product.id
              ? { ...item, wishlist: !item.wishlist }
              : item
          )
        );
        console.log("Toggled wishlist status for product ID:", id);
      }
    } catch (err) {
      console.error("Error adding to wishlist:", err);
    }
  };
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
  return (
    <>
      <header>{/* <SearchList/> */}</header>
      <main>
        <section>
          <TabCarousel data={categoryList} />
        </section>
        <section>
          {searchText.length === 0 && (
            <FlashSale data={productList} addToWishList={addToWishList}  heading={heading[1]}/>
          )}
             {searchText.length === 0 && (
                <ByCategory data={byCategoryList} />
              )}


          {searchText.length === 0 && (
            <FlashSale data={bestSellingList} addToWishList={addToWishList}  heading={heading[0]}/>
          )}


          <div className="flex flex-wrap gap-4 items-center justify-center">
            {searchText.length > 0 && results
              ? results.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col w-40 md:w-1/4 lg:w-1/5 pt-10"
                  >
                    <div>
                      <div className="relative group rounded-lg bg-gray-50 items-center justify-center">
                        <img
                          className="object-contain w-full h-44 p-6 bg-transparent mix-blend-multiply"
                          src={item.image} // Dynamic key for product image
                          alt={item.brand || "Product"}
                        />
                        <img
                          src={
                            item.wishlist
                              ? require("../assets/images/Fill Heart.png")
                              : require("../assets/images/Fill Heart.png")
                          }
                          className={`w-8 h-8 absolute top-0 right-0 mt-3 mr-2 transition-all ${
                            item.wishlist
                              ? "w-5 mt-5 mr-4 h-5"
                              : "w-8 mt-5 mr-4"
                          }`}
                          alt="Favorite Icon"
                        />
                        <p className="absolute rounded px-2 py-0.5 top-3 left-3 font-body text-white bg-red-600 text-sm">
                          -{item.discount_value || 0}%
                        </p>
                        <p className="invisible text-center font-body active:bg-red-600 rounded-b-lg p-2 bg-black text-white group-hover:visible">
                          Add to cart
                        </p>
                      </div>
                      <p className="font-body pt-2 truncate ">
                        {item.name || "Unknown Brand"}
                      </p>
                      <p className="font-body text-sm font-normal text-red-600">
                        Rs {parseFloat(item.selling_price || 0).toFixed(2)}{" "}
                        <span className="line-through text-gray-600">
                          {item.mrp || 0}
                        </span>
                      </p>
                      <RatingReview rating={item.rating || 0} />
                    </div>
                  </div>
                ))
              : searchText.length > 0 && (
                  <h1 className="text-custom_h6 pt-20 text-gray-500 text-center">
                    No result found!!
                  </h1>
                )}
          </div>
        </section>
      </main>
    </>
  );
});

export default Home;
