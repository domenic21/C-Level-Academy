import EventTypeForm from "@/app/components/EventTypeForm";
import { session } from "@/libs/session";
import { ProfileModel } from "@/models/Profile";

export default async function New() {
  const email = await session().get('email');
  const profile = await ProfileModel.findOne({email});
  if (!profile) {
    throw new Error('UserName not found Please add a UserName');
  }
  return (
    <div className="mt-4">
    
   
        <EventTypeForm
          userName={profile.userName || ''} 
        
        />

    </div>
  );
}