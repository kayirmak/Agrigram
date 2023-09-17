import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllService } from "../store/service/serviceApi";
import ServiceCard from "../components/ServiceCard/ServiceCard";

const ServicePage = () => {
  const service = useSelector((state) => state?.service);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllService(dispatch);
  }, [dispatch]);

  return (
    <div className="max-w-[1440px] justify-between items-center px-8 py-7 flex mx-auto">
      <ServiceCard service={service?.service} />
    </div>
  );
};

export default ServicePage;
