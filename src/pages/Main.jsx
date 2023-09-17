import { useContext, useEffect, useState } from "react";
import Advantage from "../components/Advantage/Advantage";
import Banner from "../components/Banner/Banner";
import Category from "../components/Category/Category";
import Partners from "../components/Partners/Partners";
import Popular from "../components/Popular/Popular";
import Products from "../components/Products/Products";
import { CartContext } from "../hoc/CartProvider";

function Main() {
  const [size, setSize] = useState(window.innerWidth);
  const { getItems } = useContext(CartContext);

  window.addEventListener("resize", function () {
    setSize(window.innerWidth);
  });

  useEffect(() => {
    document.body.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });

    const unsubscribe = getItems();
    return unsubscribe;
  }, []);

  return (
    <div className="main max-w-[1440px] mx-auto">
      {/* {size <= 962 ? <Category /> : null} */}
      <Banner />
      {/* {size <= 962 ? null : <Category />} */}
      {/* <Products /> */}
      {/* <Advantage /> */}
    </div>
  );
}

export default Main;
