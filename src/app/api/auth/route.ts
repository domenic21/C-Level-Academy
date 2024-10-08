import { nylas, nylasConfig } from "@/libs/nylas";
import { redirect } from "next/navigation";


export async function GET() { // GET method to get access token
    const authUrl = nylas.auth.urlForOAuth2({
        clientId: nylasConfig.clientId!,
        redirectUri: nylasConfig.callbackUri,
        

      });
    return redirect(authUrl); // Redirect to Nylas auth page to get access token 
}

