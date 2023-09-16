import { useLayoutEffect } from "react";
import { useLocation } from "react-router";

function ScrollOnTop() {
  const {pathname} = useLocation();
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [pathname])

  return null;
}

export default ScrollOnTop;
