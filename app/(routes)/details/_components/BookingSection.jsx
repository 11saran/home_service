import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import GlobalApi from "@/app/_Services/GlobalApi";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

function BookingSection({ children, business }) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState();
  const [selectedTime, setSelectedTime] = useState();
  const [bookedSlot,setBooedSlot]= useState([]);
  const {data} = useSession();
  useEffect(() => {
    getTime();
   
  }, []);

  //Get selected date business slot

  useEffect(()=>{
    date && BusinessBookedSlot()
  },[date])

const BusinessBookedSlot=()=>{
GlobalApi.BusinessBooedSlot(business.id,date).then(res=>{
console.log(res)
setBooedSlot(res.bookings);
})
}


  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({
        time: i + ":00AM",
      });
      timeList.push({
        time: i + ":30AM",
      });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({
        time: i + ":00PM",
      });
      timeList.push({
        time: i + ":30PM",
      });
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    GlobalApi.createNewBooking(business.id, date, selectedTime,data.user.email,data.user.name).then(res=>{
        console.log(res)
        if (res) {
             setDate("");
             setSelectedTime("");
            toast('Service Booked Successfully! ')
        }
    },(e)=>{
        toast('Error While Creating Booking')
    })
  };

const isSlotBooked=(time)=>{
    return bookedSlot.find(item=>item.time==time)
}


  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <div>{children}</div>
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader>
            <SheetTitle>Book a Service</SheetTitle>
            <SheetDescription>
              Select Date and Time slot to book a service
            </SheetDescription>
            <h2 className="my-5 font-bold">Select Date</h2>
            <div className="flex flex-col gap-5 items-baseline">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border shadow"
              />
            </div>
            <h2 className="my-5 font-bold">Select Time slot</h2>
            <div className="grid grid-cols-3 gap-3">
              {timeSlot?.map((item, index) => (
                <Button
                  disabled={isSlotBooked(item.time)}
                  key={index}
                  variant="outline"
                  className={`border rounded-full p-2 px-3 hover:bg-primary hover:text-white ${
                    selectedTime == item.time && "bg-primary text-white"
                  }`}
                  onClick={() => setSelectedTime(item.time)}
                >
                  {item.time}
                </Button>
              ))}
            </div>
          </SheetHeader>
          <SheetFooter className="mt-5">
            <SheetClose asChild>
              <div className="flex gap-5">
                <Button variant="destructive">Cancel</Button>
                <Button
                  disabled={!(selectedTime && date)}
                  onClick={() => saveBooking()}
                >
                  Book
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default BookingSection;
