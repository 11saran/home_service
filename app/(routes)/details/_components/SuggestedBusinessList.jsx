import GlobalApi from '@/app/_Services/GlobalApi';
import { Button } from '@/components/ui/button'
import { NotebookPen } from 'lucide-react'
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

function SuggestedBusinessList({business}) {
   const [businessList, setBusinessList] = useState([]);
useEffect(() => {
  if (business) {
    getBusinessList();
  }
}, [business]); 

  
    const getBusinessList = () => {
      GlobalApi.getBusinessByCategory(business?.category?.name).then((res) => {
        console.log("Fetched Businesses:", res); // Debugging
        setBusinessList(res?.businessLists || []);
      });
    };

  return (
    <div className="md:pl-10">
      <Button className="flex gap-2 w-full">
        <NotebookPen />
        Book Appointment
      </Button>
      <div className="hidden md:block">
        <h2 className="font-bold text-lg mt-3 mb-3 ">Similar Business</h2>

        <div className="">
          {businessList &&
            businessList.map((business, index) => (
              <Link
                href={"/details/" + business.id}
                key={business?.id || index}
                className="flex gap-2 mb-4 hover:border border-primary rounded-lg p-2 cursor-pointer hover:shadow-md"
              >
                <Image
                  src={business?.images?.[0]?.url || "/default-image.jpg"}
                  alt={business?.name || "Business Image"}
                  width={80}
                  height={80}
                  className="rounded-lg object-cover"
                />
                <div>
                  <h2 className="font-bold">{business.name}</h2>
                  <h2 className="text-primary">{business.contactPerson}</h2>
                  <h2 className="text-gray-400">{business.address}</h2>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default SuggestedBusinessList