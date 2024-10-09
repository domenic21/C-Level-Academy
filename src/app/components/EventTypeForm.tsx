"use client";
import clsx from "clsx";
import { BookingTimes, WeekdayName } from "../../libs/types";
import TimeSelection from "./TimeSelection";
import { FormEvent, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { IEventType } from "../../models/EventType";
import ClassroomDeleteBtn from "./ClassroomDeleteBtn";


const Weekdays: WeekdayName[] = [
  //WeekdayName is a type from types.ts that defines the days of the week
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function EventTypeForm({
  doc,
  userName = "",
}: {
  doc?: IEventType;
  userName?: string;
}) {
  const [title, setTitle] = useState(doc?.title || "");
  const [description, setDescription] = useState(doc?.description || "");
  const [length, setLength] = useState(doc?.length || 30);

 
  const [bookingTimes, setBookingTimes] = useState<BookingTimes>(
    doc?.bookingTimes || {}
  );
  const router = useRouter();
  async function handleSubmit(ev: FormEvent) {

    // This function will be called when the user clicks the save button
    // It will send the form data to the server
    ev.preventDefault(); // Prevent the default form submission
    //if id , for edit
    const id = doc?._id;
    const request = id ? axios.put : axios.post;
    const data = {
      title,
      description,
      length,
      bookingTimes,
    };

    const response = await request("/api/event-types", { ...data, id });

    if (response.data) {
      router.push("/dashboard/class-type");
      router.refresh();
    }
  }
  function handleBookingTimeChange( //
    // This function will be called when the user changes the booking time
    day: WeekdayName,
    value: string | boolean,
    prop: "from" | "to" | "active"
  ) {
    //setbooking times to the new value
    setBookingTimes((prevBookingTime) => {
      const newBookingTimes: BookingTimes = { ...prevBookingTime };
      if (!newBookingTimes[day]) {
        newBookingTimes[day] = {
          from: "00:00",
          to: "00:00",
          active: false,
          length: 0,
        };
        //if the day is not in the booking times, add it
      }
      // @ts-expect-error: prop is dynamically assigned
      newBookingTimes[day][prop] = value;

      return newBookingTimes;
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="m-4 w-[60%] h-auto mx-auto  grid gap-4 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 lg:gap-8"
    >
      <div className="h-auto rounded-lg bg-gray-200 flex flex-col gap-4 p-4">
        <label className="flex flex-col">
          <span>Title </span>
          <input
            type="text"
            placeholder="title"
            className="mt-1 p-2 border rounded"
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <span>Description</span>
          <textarea
            placeholder="description"
            className="mt-1 p-2 border rounded"
            value={description}
            onChange={(ev) => setDescription(ev.target.value)}
          />
        </label>
        <label className="flex flex-col">
          <span>Event Length (minutes) 2h max </span>
          <input
            type="number"
            placeholder="30"
            min="0"
            max={120}
            value={length}
            onChange={(ev) => setLength(parseInt(ev.target.value))}
            className=" rounded"
          />
        </label>
        <div
          className=" ml-5 
             justify-between p-4 bg-gray-100 border rounded-lg shadow-md"
        >
           Meeting URL: {""}
          {process.env.NEXT_PUBLIC_URL}/
          {userName}/{title}
        </div>
      </div>
      <div className="h-fit rounded-lg bg-gray-200 flex gap-4">
        <span className="m-3">
          Availability <br />
          <div>
            {Weekdays.map((day) => {
              const isActive = bookingTimes[day]?.active || false;
              return (
                <div key={day} className="grid grid-cols-2 gap-4 p-2">
                  {/* Column 1: Day */}
                  <div className="gap-3 flex">
                    <input
                      type="checkbox"
                      value={1}
                      checked={bookingTimes[day]?.active || false}
                      onChange={(ev) =>
                        handleBookingTimeChange(
                          day,
                          ev.target.checked,
                          "active"
                        )
                      }
                    />
                    {day}
                  </div>

                  {/* Column 2: Time Selection */}
                  <div
                    className={clsx(
                      "flex gap-2 justify-center items-center",
                      isActive ? "" : "opacity-40"
                    )}
                  >
                    <TimeSelection
                      step={30}
                      value={bookingTimes[day]?.from || "00:00"}
                      onChange={(value) =>
                        handleBookingTimeChange(day, value, "from")
                      }
                    />
                    <span>-</span>
                    <TimeSelection
                      step={30}
                      value={bookingTimes[day]?.to || "00:00"}
                      onChange={(value) =>
                        handleBookingTimeChange(day, value, "to")
                      }
                    />
                  </div>
                </div>
              );
            })}

            <div className="flex justify-end gap-4 mt-4">
              {doc && <ClassroomDeleteBtn id={doc._id as string} />}
              <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-lg  w-28 "
              >
                Save
              </button>
            </div>
          </div>
        </span>
      </div>
    </form>
  );
}
