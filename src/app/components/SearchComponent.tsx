"use client";

import { format } from "date-fns";
import { Calendar, CircleUser, NotepadText } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

interface SearchComponentProps {
  bookedEvents: {
    _id: string;
    guestName: string;
    guestEmail: string;
    when: Date;
    guestNotes: string;
    eventTypeId: string;
  }[];
  eventTypeDocs: {
    _id: string;
    title: string;
  }[];
}

const SearchComponent: React.FC<SearchComponentProps> = ({
  bookedEvents,
  eventTypeDocs,
}) => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [filteredEvents, setFilteredEvents] = useState(bookedEvents);

  useEffect(() => {
    const filtered = bookedEvents.filter((booking) => {
      const eventTypeDoc = eventTypeDocs.find(
        (etd) => (etd._id as string).toString() === booking.eventTypeId
      );
    return (
      (typeof booking.guestName === "string" &&
        booking.guestName.toString().toLowerCase().includes(query.toLowerCase())) ||
      (eventTypeDoc &&
        typeof eventTypeDoc.title === "string" &&
        eventTypeDoc.title.toString().toLowerCase().includes(query.toLowerCase()))
    );
    });
    setFilteredEvents(filtered);
  }, [query, bookedEvents, eventTypeDocs]);

  return (
    <div   className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1  ">
      {/* Render  filtered events  */}
      {filteredEvents.map((booking) => {
        const eventTypeDoc = eventTypeDocs.find(
          (etd) => (etd._id as string).toString() === booking.eventTypeId
        );
        return (
          
          <article
            key={booking._id}
            className="hover:animate-background w-[20rem] m-4 grid
                                  rounded-xl bg-gradient-to-r from-red-600 via-blue-500 to-purple-600 p-0.5
                                  shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]"
          >
            <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">
              <h1 className="mt-0.5 text-lg font-bold">
                {eventTypeDoc?.title}
              </h1>
              <div className="flex gap-2 items-center my-1">
                <CircleUser size="16" />
                <span>{booking.guestName}</span>
                <span className="text-gray-500">{booking.guestEmail}</span>
              </div>

              <div className="flex gap-2 items-center my-1">
                <Calendar size="16" />
                <span>{format(booking.when, "EEEE, MMMM d, HH:mm")}</span>
              </div>
              <div className="flex gap-2 items-center my-1">
                <NotepadText size="16" />
                <span>{booking.guestNotes}</span>
              </div>
            </div>
          </article>
        );
      })}
    </div>
    
  );
};

export default SearchComponent;
