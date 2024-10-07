import { nylas } from "@/libs/nylas";
import { BookingModel } from "@/models/Booking";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import { addMinutes } from "date-fns/addMinutes";
import mongoose from "mongoose";
import { NextRequest } from "next/server";



type JsonData = {
    guestName:string;
    guestEmail:string;
    guestNotes:string;
    username:string;
    bookingUri:string;
    bookingTime:string;
  };
  
export async function POST (req: NextRequest) {
    const data:JsonData = await req.json();
    const {guestName, guestEmail, guestNotes, bookingTime} = data;
    mongoose.connect(process.env.MONGODB_URI as string);
    const profileDoc = await ProfileModel.findOne({
        userName: data.username,
      });
      if (!profileDoc) {
        return Response.json('invalid url route', {status:404});
      }
      const eventtDoc = await EventTypeModel.findOne({
        email: profileDoc.email,
        uri: data.bookingUri,
      });
      if (!eventtDoc) {
        return Response.json('invalid url', {status:404});
      }
      await BookingModel.create({
        guestName,
        guestNotes,
        guestEmail,
        when: bookingTime,
        eventTypeId: eventtDoc._id,
      });

      const grandId = profileDoc.grantId;
      const startDate = new Date(bookingTime);

       nylas.events.create({
        identifier: grandId,
        requestBody: {
          title: eventtDoc.title,
          description: eventtDoc.description,
          when: {
            startTime: Math.round(startDate.getTime() / 1000),
            endTime: Math.round(addMinutes(startDate, eventtDoc.length).getTime() / 1000),
          },
          conferencing: {
            autocreate: {},
            provider: 'Google Meet',
          },
          participants: [
            {
              name: guestName,
              email: guestEmail,
              status: 'yes',
            },
          ],
        },
        queryParams: {
          calendarId: eventtDoc.email,
        },
      });


        return Response.json('success', {status:201});
}
//Calendar API create event 

