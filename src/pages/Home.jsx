import { HeaderComponent } from "../components/HeaderComponent";
import { TabCarousel } from "../components/TabCarousel";
import { FlashSale } from "../components/FlashSale";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {

    <PreventBackBtn/>

  

  return (
    <>
      {/* <header>
        <HeaderComponent/>
       </header> */}
      <main>
        <section>
          <TabCarousel />
        </section>
        <section>
          <FlashSale />
        </section>
      </main>
    </>
  );
}
export function PreventBackBtn(){
    const navigate = useNavigate();
    useEffect(() => {
        const handlePopState = (event) => {
          navigate("/");
        };
    
        window.addEventListener("popstate", handlePopState);
    
        return () => {
          window.removeEventListener("popstate", handlePopState);
        };
      }, [navigate]);
    
}

export default Home;
