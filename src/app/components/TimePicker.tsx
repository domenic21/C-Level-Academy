"use client";
import { weekdaysShortNames } from "@/libs/constants";
import { BookingTimes, WeekdayName } from "@/libs/types";
import clsx from "clsx";
import {
  add,
  addMinutes,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isBefore,
  isEqual,
  isFuture,
  isToday,
  parse,
  startOfToday,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function TimePicker({
  bookingTimes,
  length,
  
}: {
  bookingTimes: BookingTimes;
    length: number;
}) {
  let today = startOfToday();
  const currentDate = new Date();
  const [activeMonth, setActiveMonth] = useState(currentDate);
  let [selectedDay, setSelectedDay] = useState(today);
  let [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  let firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayCurrentMonth,
    end: endOfMonth(firstDayCurrentMonth),
  });

  function nextMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }


  function prevMonth() {
    let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }
  function handleDayClick(day: Date) {
  setSelectedDay(day);
  }
    let bookingHours = [];
    
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
        bookingHours.push(a);
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
            {bookingHours.map((bookingTime, index) => (
            <button key={index} className="p-2 bg-gray-200 rounded-xl hover:bg-blue-200 mr-2 ">
            {format(bookingTime, "HH:mm")}
            </button>
            ))}
        </div>
      </section>
    </div>
  );
} 

let colStartClasses = [
  "",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];
