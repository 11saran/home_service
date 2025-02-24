"use client";
import GlobalApi from "@/app/_Services/GlobalApi";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

function CategorySideBar() {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);

  //Get Category List

  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      console.log(res);
      setCategoryList(res.categories);
    });
  };

  const params = usePathname();
  params.split("/")[2];
  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    params && setSelectedCategory(params.split("/")[2]);
  }, [params]);

  return (
    <div>
      <h2 className="font-bold text-lg text-primary">Categories</h2>
      <div>
        {categoryList.map((category, index) => (
          <Link
            href={"/search/" + category.name}
            key={index}
            className={`flex gap-2 p-3 items-center border rounded-lg mb-3 mt-3 md:mr-10 cursor-pointer hover:bg-purple-50 hover:shadow-md hover:text-primary hover:border-primary ${
              selectedCategory == category.name &&
              "border-primary shadow-md bg-purple-50"
            }`}
          >
            <Image src={category.icon.url} alt="icon" width={30} height={30} />
            <h2>{category.name}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategorySideBar;
