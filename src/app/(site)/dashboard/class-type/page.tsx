"use server";

import { session } from "@/libs/session";
import {EventTypeModel} from "../../../../models/EventType";
import mongoose from "mongoose";
import Link from "next/link";
import { CalendarPlus } from "lucide-react";
import { ProfileModel } from "../../../../models/Profile";

//classroom generator PAGE

export default async function ClassTypePage() {
    await mongoose.connect(process.env.MONGODB_URI as string); // connect to database
    const email = await session().get("email");
    const eventTypes = await EventTypeModel.find({ email });
    const Profile = await ProfileModel.findOne({ email });

    return (
        <div className="mt-5">
            
            <div className="flex items-center w-max ml-5
             justify-between p-4 bg-gray-100 border rounded-lg shadow-md">
                Quick meeting: {''}
                {process.env.NEXT_PUBLIC_URI}{Profile?.userName}/quick-meeting
                 </div>
           
         
         

            {/*map thru the db, get back all the classrooms created
                take into consideraton the model schemas created
                */}

            {eventTypes.map(et => (
                <article key={et.id} className="hover:animate-background w-[20rem] m-4 grid  rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s]">
                    <div className="rounded-[10px] bg-white p-4 !pt-20 sm:p-6">

                        <time className="block text-md text-gray-500">  </time>
                        <a href={'/dashboard/class-type/edit/' + et.id}>
                            <h1 className="mt-0.5 text-lg font-bold">
                                {et.title}
                            </h1>
                            <h3 className="mt-0.5 text-lg font-mono text-gray-900">
                                {et.description}


                            </h3>
                        </a>

                        <div className="mt-4 flex flex-wrap gap-1">
                            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                                Snippet
                            </span>

                            <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                                JavaScript
                            </span>
                        </div>
                    </div>
                </article>
            ))}
               <Link
                href="/dashboard/class-type/new"
                className="rounded-full px-4 py-4 mt-7 ml-5 bg-gray-300 inline-block"
            >
                <CalendarPlus size={24} className="inline-block mr-2" />
                Add New Classroom
            </Link>
        </div>
    );
}
