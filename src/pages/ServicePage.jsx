import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllService } from "../store/service/serviceApi";

const ServicePage = () => {
  const service = useSelector((state) => state.service);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllService(dispatch);
  }, [dispatch]);

  return <div>ServicePage</div>;
};

export default ServicePage;
