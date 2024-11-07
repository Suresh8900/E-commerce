import CountdownTimer from "./CountdownTimer";
import React, { useRef,useState } from "react";
import { useHorizontalScroll } from "./useHorizontalScroll";

export function FlashSale() {
  const { scrollRef, scrollLeft, scrollRight } = useHorizontalScroll();

  const products = [
    { id: 1, brand: "Ford" },
    { id: 2, brand: "BMW" },
    { id: 3, brand: "Audi" },
    { id: 4, brand: "Ford" },
    { id: 5, brand: "BMW" },
    { id: 6, brand: "Ford" },
    { id: 7, brand: "BMW" },
    { id: 8, brand: "Ford" },
    { id: 9, brand: "BMW" },
    { id: 10, brand: "Ford" },
    { id: 11, brand: "BMW" },

  ];

  return (
    <div className="flex flex-col  max-lg:px-4  pt-20 overflow-hidden">



      <div className="flex lg:px-20 ju">
        <div className="bg-red-600 w-2 rounded-sm"></div>
        <p className="text-red-600 font-body pl-4">Today's</p>
      </div> 

      <div className="flex max-md:flex-col lg:px-20 justify-between">
        <div className="flex flex-row max-md:flex-col ">
        <p className="text-custom_h6  font-body pr-28">Flash Sales</p>

        <CountdownTimer targetDate="2024-11-05T23:59:59" />
        </div>

        <div className="invisible md:visible  lg:visible  flex flex-row">
        <img src={require('../assets/images/Fill With Left Arrow.png')}
         onClick={scrollLeft}
          className="h-8 w-8 mr-5"
        />
      

      <img src={require('../assets/images/Fill with Right Arrow.png')}
         onClick={scrollRight}
          className="h-8 w-8"
        />
        </div>

      </div>

     
      <div className="">
      <div ref={scrollRef} className=" overflow-auto lg:flex  scrollbar-hide">
      <div className="flex max-md:flex-col lg:pl-20 lg:pr-20 lg:flex-row gap-x-4">
        {products.map((car) => (
          <Products key={car.id} brand={car.brand} />
        ))}
      </div>

      </div>
      </div>    
    </div>

    




  );
}



function RatingReview({ rating, setRating }) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => {
        return (  
          <span
            className='start'
            style={{
              cursor: 'pointer',
              color: rating >= star ? 'gold' : 'gray',
              fontSize: `15px`,
            }}
            onClick={() => {
              setRating(star)
            }}
          >
            {' '}
            ★{' '}
          </span>
        )
      })}
    </div>
  )
}
export function MyComponent() {
  let counter = 0;

  const updateCounter = () => {
    counter += 1;
    console.log("Counter updated:", counter); // Logs updated value, but won't re-render
  };

  return (
    <div>
      <p>Counter (won't update visually): {counter}</p>
      <button onClick={updateCounter}>Update Counter</button>
    </div>
  );
}

function Products(props) {
  const [rating, setRating] = useState(0)
  return (
    <div className="flex flex-col  w-full pt-10">
      <div className=" group rounded-lg bg-gray-50 lg:w-60  md:w-60 items-center justify-center center">
        <img
          className="object-contain w-full h-52 p-3 center "
          src={require("../assets/images/Frame 611.png")}
        />
         <p className="invisible  text-center  font-body active:bg-red-600 rounded-b-lg  p-2 bg-black text-white  group-hover:visible  group">Add to cart</p> 
      </div>
      <p className="font-body">HAVIT HV-G92 Gamepad</p>
      <p className="font-body">
        $120 <span className="line-through">$160</span>
      </p>
      <RatingReview rating={rating} setRating={setRating} />
    </div>
  );
  // return <li>I am a { props.brand }</li>;
}

export default FlashSale;
