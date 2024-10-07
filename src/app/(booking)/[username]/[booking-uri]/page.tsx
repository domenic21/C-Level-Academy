
import TimePicker from "@/app/components/TimePicker";
import {EventTypeModel} from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";
import 'tailwindcss/tailwind.css';
type PageProps = {
  params: {
    username: string;
    "booking-uri": string;
  };
};
export default async function BookingPage(props: PageProps) {
  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const profileDoc = await ProfileModel.findOne({ 
    userName: props.params.username });
    
    if(!profileDoc){
      return <div>Profile not found</div>}

  const eventDoc = await EventTypeModel.findOne({ 
    email: profileDoc?.email,
    uri: props.params["booking-uri"] });
    
    if(!eventDoc){
      return <div>Event not found</div>}
  
   
    
  return (
 
          
          <TimePicker 
            length={eventDoc.length}
            username={props.params.username}
            meetingUri={eventDoc.uri}
            bookingTimes={JSON.parse(JSON.stringify(eventDoc.bookingTimes))}
          />
  );
}
 
