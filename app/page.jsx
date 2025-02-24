"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import { useEffect, useState } from "react";
import GlobalApi from "./_Services/GlobalApi";
import  BusinessList from "./_components/BusinessList";


export default function Home() {
const [categoryList,setCategoryList]=useState([]);
const [businessList,setBusinessList]=useState([])

//Get Category List

const getCategoryList = () => {
  GlobalApi.getCategory().then((res) => {
   setCategoryList(res.categories);
  });
};

useEffect(() => {
  getCategoryList();
  getAllBusinessList(); 
}, []);

//Get All Business List
const getAllBusinessList = ()=>{
  GlobalApi.getAllBusinessList().then((res)=>{
 setBusinessList(res.businessLists);
  })
}

  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList} />
      <BusinessList businessList={businessList} title={"Popular Business"} />
    </div>
  );
}
