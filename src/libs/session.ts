import nextAppSession from 'next-app-session';

// This is a simple session manager that stores session data in memory or cookie
// In a real app, you would store this in a database

type MysessionData = { 
    grantId?: string;
    email?: string; 
};

// Create a session manager
export const session = nextAppSession<MysessionData>({
    name: 'session',
    secret: process.env.SECRET,

});
