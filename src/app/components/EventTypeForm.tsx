'use client';
import clsx from "clsx";
import { BookingTimes, WeekdayName } from "../libs/types";
import TimeSelection from "./TimeSelection";
import { useState } from "react";

const Weekdays:WeekdayName[]= [ 
 //WeekdayName is a type from types.ts that defines the days of the week
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

export default function EventTypeForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [length, setLength] = useState('');
    const [bookingTimes, setBookingTimes] = useState<BookingTimes>({});
    function handleBookingTimeChange( //
        // This function will be called when the user changes the booking time
    day: WeekdayName,
    value: string | boolean ,
    fromOrTo: 'from' | 'to' | 'active' ,
    ) {
        //setbooking times to the new value
        setBookingTimes(prevBookingTime => {
            const newBookingTimes:BookingTimes = {...prevBookingTime};
            if (!newBookingTimes[day]) {
                newBookingTimes[day] = {from: '00:00', to: '00:00', active: false};
                //if the day is not in the booking times, add it

            }
            newBookingTimes[day][fromOrTo] = value;
            return newBookingTimes;
    });
    }

    return (
    
        <div className="m-4 w-[60%] h-auto mx-auto  grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 lg:gap-8">
            <div className="h-auto rounded-lg bg-gray-200 flex flex-col gap-4 p-4">
                <label className="flex flex-col">
                    <span>Title</span>
                    <input
                        type="text"
                        placeholder="title"
                        className="mt-1 p-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>
                <label className="flex flex-col">
                    <span>Description</span>
                    <textarea
                        placeholder="description"
                        className="mt-1 p-2 border rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                <label className="flex flex-col">
                    <span>Event Length (minutes) </span>
                    <input type="number" placeholder="30"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    />
                </label>
            </div>
            <div className="h-fit rounded-lg bg-gray-200 flex gap-4">
                <span className="m-3">
                    Availability <br />
                    <div>
                        {Weekdays.map((day) => {
                            const from = bookingTimes[day]?.from || '00:00';
                            const to = bookingTimes[day]?.to || '00:00';
                            const isActive = bookingTimes[day]?.active || false;
                            return (
                                <div key={day} className="grid grid-cols-2 gap-4 p-2">
                                {/* Column 1: Day */}
                                <div className="gap-3 flex">
                                    <input type="checkbox"
                                    value={1}
                                    checked={bookingTimes[day]?.active || false}
                                    onChange={ev => handleBookingTimeChange(day, ev.target.checked, 'active')}
                                    
                                    />
                                    {day}</div>

                                {/* Column 2: Time Selection */}
                                <div className={
                                    clsx(
                                        "flex gap-2 justify-center items-center",
                                        isActive ?'' : 'opacity-40'
                                        )}>
                                    <TimeSelection 
                                    value={bookingTimes[day]?.from || '00:00'}
                                    onChange={value => handleBookingTimeChange(day, value, 'from')}
                                    
                                    />
                                    <span>-</span>
                                    <TimeSelection value={bookingTimes[day]?.to|| '00:00'}
                                    onChange={value => handleBookingTimeChange(day, value, 'to')}
                                    />
                                </div>
                            </div>
                            )
                        }
                            
                        )}
                        <div className="flex justify-end ">
                        <button className="bg-blue-500 text-white p-2 rounded-lg  w-28 ">

                            Save
                        </button>
                        </div>
                    </div>
                </span>

            </div>

        </div>
    );
}
