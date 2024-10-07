
import SearchBar from "@/app/components/SearchBar";
import SearchComponent from "@/app/components/SearchComponent";
import { session } from "@/libs/session";
import { BookingModel } from "@/models/Booking";
import { EventTypeModel } from "@/models/EventType";
import mongoose from "mongoose";



export default async function DashboardPage() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  const email = await session().get("email");
  const eventTypeDocs = await EventTypeModel.find({ email });

  const bookedEvents = await BookingModel.find(
    {
      eventTypeId: eventTypeDocs.map((doc) => doc._id),
    },
    {},
    { sort: "when" }
  );


  return (
    <div>
           <p className="flex justify-center mt-4 text-red-400  font-medium ">Filter by title event or student name</p>
      <div className="flex justify-center mt-4">
 
        <SearchBar />
      </div>
    <div className="min-h-screen flex justify-center items-baseline mt-8">
      
    
      
      <SearchComponent 
      bookedEvents={JSON.parse(JSON.stringify(bookedEvents))} 
      eventTypeDocs={JSON.parse(JSON.stringify(eventTypeDocs))} />
      </div>
    </div>
  
  );
}
