"use client";
import BusinessList from "@/app/_components/BusinessList";
import GlobalApi from "@/app/_Services/GlobalApi";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; 

function BusinessByCategory() {
  const params = useParams(); // Get params from next/navigation
  const category = params?.category; // Extract category safely
  const [businessList, setBusinessList] = useState([]);

  useEffect(() => {
    console.log("Category:", category);
    if (category) {
      getBusinessList(category);
    }
  }, [category]);

  const getBusinessList = (category) => {
    GlobalApi.getBusinessByCategory(category).then((res) => {
      setBusinessList(res?.businessLists || []);
    });
  };

  return (
    <div>
      <BusinessList title={category} businessList={businessList} />
    </div>
  );
}

export default BusinessByCategory;
