import { nylas } from "@/libs/nylas";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { TimeSlot } from "nylas";



export async function GET(req: NextRequest) {
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    const from = new Date( url.searchParams.get('from')as string);
    const to = new Date( url.searchParams.get('to')as string);

    await mongoose.connect(process.env.MONGODB_URI as string);

   const profileDoc = await ProfileModel.findOne({username});
    if(!profileDoc){
         return Response.json('invalid url busy route', {status:404});
    }
 const result = await nylas.calendars.getFreeBusy({ 
    identifier: profileDoc.grantId,
    requestBody: {
        emails: [profileDoc.email],
        startTime: Math.round(from.getTime() / 1000),
        endTime: Math.round(to.getTime()/1000),
    },
});   
let busySlots:TimeSlot[] = [];
if (result.data?.[0]) {
  // @ts-expect-error: TypeScript cannot infer the type of result.data[0].timeSlots correctly
  const slots = result.data?.[0]?.timeSlots as TimeSlot[];
  // @ts-expect-error: TypeScript cannot infer the type of result.data[0].timeSlots correctly
  busySlots = slots.filter(slot => slot.status === 'busy');
}

return Response.json(busySlots);
}