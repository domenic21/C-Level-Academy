"use server";
import EventTypeForm from "@/app/components/EventTypeForm";
import { session } from "@/libs/session";
import { EventTypeModel } from "@/models/EventType";
import { ProfileModel } from "@/models/Profile";
import mongoose from "mongoose";

type PageProps ={
    params:{
        id:string;
    }
}


export default async function EditClassroomTypePage({params}: PageProps){
    
     await mongoose.connect(process.env.MONGODB_URI as string )
     const eventTypeDoc = await EventTypeModel.findOne({_id: params.id});
     console.log(eventTypeDoc);
     const email = await session().get('email');
     const profile = await ProfileModel.findOne({email});
    
     if (!profile) {
        throw new Error('Profile not found');
      }
     
      
    return(
        
            <div>
            <EventTypeForm 
              userName={profile.userName || ''} 
              doc={JSON.parse(JSON.stringify(eventTypeDoc))} 
            />
            </div>
    
        
        
      
    )
}

//params is a parameter,object containing properties