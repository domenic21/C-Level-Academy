import { nylas, nylasConfig } from "@/libs/nylas";
import { session } from "@/libs/session";
import mongoose from "mongoose";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { ProfileModel } from "@/models/Profile";

export async function GET(req: NextRequest) {
 
    console.log("Received callback from Nylas");
    const url = new URL(req.url); // Get the URL from the request object 
    console.log("Request URL:", url.toString());
    const code =url.searchParams.get("code"); // get the code from the URL
    console.log("Authorization code12:", code);
    if (!code) {
      //response if code is not found with  json
      return NextResponse.json({ error: "Authorization code not found" }, { status: 400 });
    }
  
    const codeExchangePayload = {
      clientSecret: nylasConfig.apiKey, //get the api key from the nylas config
      clientId: nylasConfig.clientId as string, //make string because is a number TYPESCRIPT
      redirectUri: nylasConfig.callbackUri, //get the redirect uri from the nylas config
      code, //get the code from the url
    };
      
      const response = await nylas.auth.exchangeCodeForToken(codeExchangePayload);
      
      const { grantId, email } = response;
      if (!mongoose.connection.readyState) {
        await mongoose.connect(process.env.MONGODB_URI as string);
      }
        const profileDoc = await ProfileModel.findOne({ email });
        if (profileDoc) {   
            profileDoc.grantId = grantId;
            await profileDoc.save();
        } else {
            await ProfileModel.create({ email, grantId });
        }
        await session().set('email', email);
     





      // NB: This stores in RAM
      // In a real app you would store this in a database, associated with a user
      //process.env.NYLAS_GRANT_ID = grantId; // Store the grant ID in the environment variable
     // await session().set('grantId', grantId);// Store the grant ID in the session in a cookie 
     // Store the email in the session in a cookie


  
      redirect("/"); // Redirect to the home page
    } 
    
