'use server';
import DashboardNav from "@/app/components/DashboardNav";
import { session } from "@/app/libs/session";
import EventType from "@/app/models/EventType";
import mongoose from "mongoose";
import EventTypeForm from "@/app/components/EventTypeForm";
import Link from "next/link";
import { CalendarPlus } from 'lucide-react';




export default  async function ClassTypePage() {
await mongoose.connect(process.env.MONGODB_URI as string); // connect to database
const email = await session().get('email');
const eventTypes = await  EventType.find({email});
    return (

        <div className="mt-5">
            <DashboardNav />
            {JSON.stringify(eventTypes)}
           
            
            <Link href="/dashboard/class-type/new"
             className="rounded-full px-4 py-4 mt-7 ml-5 bg-gray-300 inline-block"> 
            <CalendarPlus size={24} className="inline-block mr-2" />
            Add New Classroom
            </Link>

        </div>
    );
}