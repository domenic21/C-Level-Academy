"use client";
import { weekdaysShortNames } from "@/libs/constants";
import { BookingTimes, WeekdayName } from "@/libs/types";
import axios from "axios";
import clsx from "clsx";
import {
  add,
  addMinutes,
  eachDayOfInterval,
  endOfDay,
  endOfMonth,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isFuture,
  isToday,
  parse,
  startOfDay,
  startOfToday,
  
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { TimeSlot } from "nylas";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export default function TimePicker({
  bookingTimes,
  length,
  meetingUri,
    username,
  
}: {
    meetingUri: string;
    username: string;
  bookingTimes: BookingTimes;
    length: number;
}) {
  const today = startOfToday();
  
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());
  const [busySlots, setBusySlots] = useState<TimeSlot[]>([]);
  const [busySlotsLoaded, setBusySlotsLoaded] = useState(false);


  useEffect(() => {
    if (selectedDay) {
      setBusySlots([]);
      const params = new URLSearchParams();
      params.set('userName', username);
      params.set('from', startOfDay(selectedDay).toISOString());
      params.set('to', endOfDay(selectedDay).toISOString());
      axios
        .get(`/api/busy?`+params.toString())
        .then(response => {
          setBusySlots(response.data);
          setBusySlotsLoaded(true);
        
        });
    }
  }, [selectedDay, username]);

  function isBusy(time: Date) {
    const bookingFrom = time;
    const bookingTo = addMinutes(new Date(time), length);
    let busySlot: TimeSlot;
    for ( busySlot of busySlots) {
      const busyFrom = new Date(parseInt(busySlot.startTime) * 1000);
      const busyTo = new Date(parseInt(busySlot.endTime) * 1000);
      if (isAfter(bookingTo, busyFrom) && isBefore(bookingTo, busyTo)) {
        return true;
      }
      if (isAfter(bookingFrom, busyFrom) && isBefore(bookingFrom, busyTo)) {
        return true;
      }
      if (isEqual(bookingFrom, busyFrom)) {
        return true;
      }
      if (isEqual(bookingTo, busyTo)) {
        return true;
      }
    }

    return false;
    
    
  }

    
  const days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }


  function prevMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  function handleDayClick(day: Date) {
  setSelectedDay(day);
  }
    const bookingHours = [];
    
  const selectedDayConfig = bookingTimes?.[format(selectedDay, "EEEE") as WeekdayName];

  if(selectedDay && selectedDayConfig){
  const selectedDayFrom = new Date(selectedDay);
  const selectedDayTo = new Date(selectedDay);
    selectedDayFrom.setHours(Number(selectedDayConfig.from.split(":")[0]));
    selectedDayFrom.setMinutes(Number(selectedDayConfig.from.split(":")[1]));
    selectedDayTo.setHours(Number(selectedDayConfig.to.split(":")[0]));
    selectedDayTo.setMinutes(Number(selectedDayConfig.to.split(":")[1]));

    

   let a = selectedDayFrom;
    do{
        if(!isBusy(a)){
        bookingHours.push(a);
        }
      
        a = addMinutes(a,  length);

    }while(isBefore(addMinutes(a,length) , selectedDayTo));
}


  return (
    <div className="grid  gap-6 sm:grid-cols-1 lg:grid-cols-2  ">
      <section className="col-span-1">
        <div className="items-center flex justify-between">
          <button onClick={prevMonth}>
            <ChevronLeft />
          </button>
          <span className="text-center flex-grow">
            {format(firstDayCurrentMonth, "MMMM yyyy")}
          </span>
          <button onClick={nextMonth}>
            <ChevronRight />
          </button>
        </div>
        <div className="inline-grid gap-x-1 grid-cols-7 mt-4 justify-center text-sm ">
          {weekdaysShortNames.map((weekdaysShortNames) => (
            <div className="uppercase" key={weekdaysShortNames}>
              {weekdaysShortNames}
            </div>
          ))}
          {days.map((day, dayIdx) => {
           
            const dayNameidx = format(day, "EEEE") as WeekdayName;
            const weekDayConfig = bookingTimes?.[dayNameidx]
            const  ActiveBookingDay = weekDayConfig?.active;
            const canBook = isFuture(day) && ActiveBookingDay;
            return (
              <button
                
                disabled={!canBook} 
                onClick={() => handleDayClick(day)}
                className={clsx(
                  "uppercase  rounded-full mt-2 h-8 w-8 inline-flex items-center justify-center",
                  dayIdx === 0 && colStartClasses[getDay(day)], canBook ? "bg-blue-500 text-white" : " text-gray-400",
                  isToday(day) && "border-2 border-red-600 bg-white text-black",
                  selectedDay && isEqual(day, selectedDay) ? "bg-green-300 text-black font-bold": ""
                  
                )}
                key={day.toString()}
              >
                <time dateTime={format(day, "yyyy-MM-dd")} className="font-semibold-">
                  {format(day, "d")}
                </time>
              </button>
            );
          })}
        </div>
      </section>
      <section className="col-span-1">
        
        <p> {format(selectedDay,"EEEE, MMMM d" )}</p>
        <div className="flex flex-col space-y-2 overflow-y-scroll overflow-x-hidden max-h-60">
        {bookingHours.length === 0 && busySlotsLoaded && <div className="text-center font-semibold text-red-600 py-3">No available slots</div>}
        {!busySlotsLoaded && (
              <div className="flex justify-center py-4">
                <PulseLoader color="#3B82F6" />

              </div>
            )}
      
            { busySlotsLoaded && bookingHours.map((bookingTime, index) => (
                   
            <Link href={`/${username}/${meetingUri}/${bookingTime.toISOString()}`} key={index} className="p-2 bg-gray-200 rounded-xl hover:bg-blue-200 mr-2 ">
            {format(bookingTime, "HH:mm")}
            </Link>
            ))}

         
        </div>
      </section>
    </div>
  );
} 

const colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
