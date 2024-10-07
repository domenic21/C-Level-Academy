
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import {Clock, Info} from "lucide-react";
import mongoose from "mongoose";
import 'tailwindcss/tailwind.css';

type LayoutProps = {
    children: React.ReactNode;
    params: {
        username: string;
        "booking-uri": string;
       
    };
};


export default async function BookingPage(props: LayoutProps) {

  await mongoose.connect(process.env.MONGODB_URI as string);
  
  const profileDoc = await ProfileModel.findOne({ 
    userName: props.params.username
    
  });
    
    if(!profileDoc){
      return <div>Profile not found</div>}

  const eventDoc = await EventTypeModel.findOne({ 
    email: profileDoc?.email,
    uri: props.params["booking-uri"] });
    
    if(!eventDoc){
      return <div>Event not found</div>}


  
    return (
        <div
        className="flex items-center h-screen bg-cover "
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
    <div
      className="p-1 mx-auto rounded-xl w-[70%] bg-white shadow-lg grid md:grid-cols-2 gap-4 md:gap-8 md:grid-rows-1
      sm:grid-cols-1 "
    >  <section  
              className="bg-blue-100 overflow-hidden max-w-lg max-h-full p-4"
            > {/* left side */}
              <h1 className="text-2xl font-semibold">{eventDoc.title}</h1>
              <div className="flex items-start space-x-2">
                <Clock  />
                <span>{eventDoc.length} min</span>
              </div>
                <div className="flex items-start space-x-2">
                <Info className="mt-1" />
                <span className="flex-1 text-sm">{eventDoc.description} </span>
                </div>
            </section>
            <div className="bg-white rounded-md h-[25rem]"> {/* right side */}
             {props.children}
    
            </div>
          
    
          </div>
       </div>
        )


}