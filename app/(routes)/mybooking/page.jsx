"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSession } from "next-auth/react";
import GlobalApi from "@/app/_Services/GlobalApi";
import BookingHistoryList from "../mybooking/_component/BookingHistoryList";

function MyBooking() {
  const { data } = useSession();
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    if (data) {
      GetUserBookingHistory();
    }
  }, [data]);

  const GetUserBookingHistory = () => {
    GlobalApi.GetUserBookingHistory(data.user.email).then((res) => {
      console.log(res);
      setBookingHistory(res.bookings);
    });
  };

  // Filter the booking history based on status (booked/completed)
  const filterData = (type) => {
    return bookingHistory?.filter((item) =>
      type === "booked"
        ? new Date(item.date) >= new Date()
        : new Date(item.date) < new Date()
    );
  };

  return (
    <div className="my-10 mx-5 md:mx-36">
      <h2 className="font-bold text-[20px] my-2">My Bookings</h2>
      <Tabs defaultValue="booked" className="w-full justify-start">
        <TabsList className="w-full">
          <TabsTrigger value="booked">Booked</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="booked">
          <BookingHistoryList bookingHistory={filterData("booked")} />
        </TabsContent>

        <TabsContent value="completed">
          <BookingHistoryList bookingHistory={filterData("completed")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default MyBooking;
