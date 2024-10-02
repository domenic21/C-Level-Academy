import {nylas, nylasConfig} from "../../../libs/nylas";
import { NextApiRequest } from "next";
import {session} from "@/libs/session";
//import {ProfileModel} from "@/models/Profile";
//import mongoose from "mongoose";
import {redirect} from "next/navigation";
import {NextRequest} from "next/server";

export async function GET(req: NextApiRequest) {
    console.log("Received callback from Nylas");
    const url = new URL(req.url as string); // Get the URL from the request object 
    console.log("Request URL:", url.toString());
    const code =url.searchParams.get("code"); // get the code from the URL
    console.log("Authorization code12:", code);
    if (!code) {
      //response if code is not found with  json
      return Response.json(  "Authorization code not found ", {status:400} );
    }
  
    const codeExchangePayload = {
      clientSecret: nylasConfig.apiKey, //get the api key from the nylas config
      clientId: nylasConfig.clientId as string, //make string because is a number TYPESCRIPT
      redirectUri: nylasConfig.callbackUri, //get the redirect uri from the nylas config
      code,
    };
      
      const response = await nylas.auth.exchangeCodeForToken(codeExchangePayload);
      const { grantId, email } = response;
      // NB: This stores in RAM
      // In a real app you would store this in a database, associated with a user
      process.env.NYLAS_GRANT_ID = grantId; // Store the grant ID in the environment variable
      await session().set('grantId', grantId);// Store the grant ID in the session in a cookie 
      await session().set('email', email);// Store the email in the session in a cookie
  
      redirect('/'); // Redirect to the home page
    } 
    
