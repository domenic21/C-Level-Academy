"use client";
import axios from "axios";
import { format } from "date-fns";
import { FormEvent, useState } from "react";

type PageProps = {
  params: {
    username: string;
    "booking-uri": string;
    "booking-time": string;
  };
};

export default function BookingPage(props: PageProps) {
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestNotes, setGuestNotes] = useState("");
  const [ confirmation, setConfirmation] = useState(false);

  const username = props.params.username;
  const bookingUri = props.params["booking-uri"];
  const bookingTime = new Date(
    decodeURIComponent(props.params["booking-time"])
  );

 async  function handleSubmit(ev:FormEvent) {
    ev.preventDefault();
    const data = {guestName, guestEmail, guestNotes, username, bookingUri, bookingTime};
     await axios.post('/api/bookings', data);
    setConfirmation(true);
  }

  return (
    <div className="">
      <h2 className="font-bold text-left p-4">
        {format(bookingTime, "EEEE, MMMM, d , HH:mm")}
      </h2>

      {confirmation && (
        <div className="text-left py-12 font-semibold">Booking Confirmed !  <br />Please wait for email instruction for payment! </div>) }


        {!confirmation && (
      <form className="bg-white p-2 rounded-lg " onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
          <label>
            <span className="font-semibold pt-2 mt-2">
              Any additional info?
            </span>
            <textarea
              className="block w-full mt-1 rounded-lg"
              placeholder="Any relevant information (optional)"
              value={guestNotes}
              onChange={(e) => setGuestNotes(e.target.value)}
            />
          </label>
        </div>

        <button

          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out"
        >
          Book
        </button>
      </form>
        )}
    
    </div>
    
  );
}
