import { session } from "@/libs/session";
import mongoose from "mongoose";
import { NextRequest } from "next/server";
import { ProfileModel } from "../../../models/Profile";

export async function PUT(req: NextRequest) {
    //get the data from the request
    await mongoose.connect(process.env.MONGODB_URI as string);
    const body = await req.json();
    const { userName } = body;
    const email = await session().get("email");
    if (email && userName) {
        const profileDoc = await ProfileModel.findOne({ email });
        if (profileDoc) {
            profileDoc.userName = userName;
            await profileDoc.save();
        } else {
            await ProfileModel.create({ email, userName });
        }
        return Response.json(true); // Return true if the profile was updated or created
    }
    return Response.json(false); // Return false if email or username is missing
}
