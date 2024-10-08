
import nextAppSession from 'next-app-session';

// This is a simple session manager that stores session data in memory or cookie
// In a real app, you would store this in a database

type MySessionData = { 
    grantId?: string;
    email?: string; 
};

export const session = nextAppSession<MySessionData>({
  name: 'session',
  secret: process.env.SECRET,
  cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie valid for 7 days
      httpOnly: true,                  // Security measure: cookie cannot be accessed by client-side JS
  },
});