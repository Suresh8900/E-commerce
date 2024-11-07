export function TabCarousel() {
    const numbers = ["Woman’s Fashion", "Men’s Fashion","Electronics", "Home & Lifestyle", "Sports & Outdoor", "Baby’s & Toys",
"Groceries & Pets","Health & Beauty"
];
    return (
        <>
            <div className="flex lg:px-24   max-lg:px-2">

                <div className="flex flex-col  pt-6 w-1/3  p-0 m-0  font-body">
                    
                    <div className="flex">
                    <div className="flex  flex-col gap-y-1.5 ">
                    <CategoriesList numbers={numbers} />
                    </div>
                    <div className="flex flex-col pl-10 text-sm pt-3">
                    <p>&gt;</p>
                    <p className=" pt-3">&gt;</p>
                    </div>

                    </div>

                </div>

                <div className="border-l-2 border-gray-100 h-auto"></div>


                <div className="border mt-6    bg-bg-phone  bg-contain bg-no-repeat bg-right lg:ml-20 w-full bg-black">
                      
                    </div>
            </div>
        </>
    );
  }

  function CategoriesList(props) {
    const numbers = props.numbers;
  
    const listItems = numbers.map((number) => (
      <li className="text-sm pt-3" key={number.toString()}>
        {number}
      </li>
    ));
  
    return (
      <ul>{listItems}</ul>
    );
  }
  
  