import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function TabCarousel({ data }) {
  const numbers = data;
  return (
    <>
      <div className="flex lg:px-24 max-lg:flex-col  max-lg:px-2 overflow-hidden">
        <div className="flex flex-col justify-center  items-center max-lg:w-full pt-6 w-1/3  p-0 m-0  font-body">
          <div className="flex">
            <div className="flex  flex-col gap-y-1.5 ">
              {numbers ? (
                <CategoriesList numbers={numbers} />
              ) : (
                <Skeleton
                  count={10}
                  height={12}
                  containerClassName="w-full"
                  className=" border w-full"
                  style={{ height: "20px",width: "60px" }}
                />
              )}
            </div>
            <div className="flex flex-col pl-10 text-sm pt-3">
              <p>&gt;</p>
              <p className=" pt-3">&gt;</p>
            </div>
          </div>
        </div>

        <div className="border-l-2 border-gray-100 "></div>

        <div className="border mt-6  h-60   bg-bg-phone  bg-contain bg-no-repeat bg-right lg:ml-20 w-full bg-black">

        </div>
      </div>
    </>
  );
}

function CategoriesList(props) {
  const numbers = props.numbers;

  const listItems = numbers.map((number) => (
    <li className="text-sm pt-3" key={number.toString()}>
      {number.name}
    </li>
  ));

  return <ul>{listItems}</ul>;
}
