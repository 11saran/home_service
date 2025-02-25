"use client";
import GlobalApi from "@/app/_Services/GlobalApi";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams
import BusinessInfo from "../_components/BusinessInfo";
import SuggestedBusinessList from "../_components/SuggestedBusinessList";
import BusinessDescription from "../_components/BusinessDescription";
function BusinessDetail() {
  const params = useParams(); // Get params correctly
  const { data, status } = useSession();
  const [business, setBusiness] = useState([]);

  useEffect(() => {
    if (params?.businessId) {
      getBusinessById(params.businessId);
    }
  }, [params]); // Only fetch when businessId is available

  useEffect(() => {
    checkAuth();
  }, [status]);

  const getBusinessById = (businessId) => {
    GlobalApi.getBusinessById(businessId)
      .then((res) => {
        setBusiness(res.businessList);
      })
      .catch((err) => console.error("Error fetching business:", err));
  };

  const checkAuth = () => {
    if (status === "loading") return;
    if (status === "unauthenticated") signIn("descope");
  };

  return status === "authenticated" && business ? (
    <div className="py-8 md:py-20 px-10 md:px-36">
      <BusinessInfo business={business} />
      <div className="grid grid-cols-3 mt-16">
        <div className="col-span-3 md:col-span-2 order-last md:order-first">
          <BusinessDescription business={business} />
        </div>
        <div className=" ">
          <SuggestedBusinessList business={business} />
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default BusinessDetail;
