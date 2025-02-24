"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Hero from "./_components/Hero";
import CategoryList from "./_components/CategoryList";
import { useEffect, useState } from "react";
import GlobalApi from "./_Services/GlobalApi";


export default function Home() {
const [categoryList,setCategoryList]=useState([]);

const getCategoryList = () => {
  GlobalApi.getCategory().then((res) => {
   setCategoryList(res.categories);
  });
};

useEffect(() => {
  getCategoryList();
}, []);

  return (
    <div>
      <Hero />
      <CategoryList categoryList={categoryList} />
    </div>
  );
}
