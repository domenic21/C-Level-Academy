import DashboardNav from "@/app/components/DashboardNav";
import { session } from "@/libs/session";
import { ProfileModel } from "../../../models/Profile";
import mongoose from "mongoose";

export default async  function DashboardLayout({ children }: { children: React.ReactNode }) {
   const email = await session().get('email');
   if (!email) {
       return 'not log in yet';
    }
    await mongoose.connect(process.env.MONGODB_URI as string);
    const profileDoc = await ProfileModel.findOne({ email });
    
    return (
        <div className="container max-w-full mt-4">
            <DashboardNav userName={profileDoc?.userName || ''} />

            {children}
        </div>
    );
}
//a child component is a component that is nested inside of another component.
//in this case the children prop is the child component
//a prop is a way to pass data from a parent component to a child component in React
//the children prop is a special prop that is passed to components automatically