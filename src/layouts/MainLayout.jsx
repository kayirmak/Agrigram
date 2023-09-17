import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getCategory, getSubCategory } from "../store/category/categoryApi";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ScrollOnTop from "../components/ScrollOnTop/ScrollOnTop";

function MainLayout() {
  const dispatch = useDispatch();
  useEffect(() => {
    getCategory(dispatch);
    getSubCategory(dispatch);
  }, []);

  return (
    <div className="layout">
      <ScrollOnTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
