
import MongoStore from 'connect-mongo';
import nextAppSession from 'next-app-session';

// This is a simple session manager that stores session data in memory or cookie
// In a real app, you would store this in a database

type MySessionData = { 
    grantId?: string;
    email?: string; 
};
// Create a session manager with a persistent store (MongoDB)
export const session = nextAppSession<MySessionData>({
  name: 'session',
  secret: process.env.SECRET,
  store: {
    get: (sid: string) => {
      return new Promise((resolve, reject) => {
        MongoStore.create({
          mongoUrl: process.env.MONGODB_URI, // MongoDB connection string
          ttl: 14 * 24 * 60 * 60 // Set session expiry time (14 days here)
        }).get(sid, (err, session) => {
          if (err) return reject(err);
          resolve(session);
        });
      });
    },
    set: (sid: string, session: MySessionData) => {
      return new Promise((resolve, reject) => {
        MongoStore.create({
          mongoUrl: process.env.MONGODB_URI, // MongoDB connection string
          ttl: 14 * 24 * 60 * 60 // Set session expiry time (14 days here)
        }).set(sid, session, (err: Error | null) => {
          if (err) return reject(err);
          resolve();
        });
      });
    },
    destroy: (sid: string) => {
      return new Promise((resolve, reject) => {
        MongoStore.create({
          mongoUrl: process.env.MONGODB_URI, // MongoDB connection string
          ttl: 14 * 24 * 60 * 60 // Set session expiry time (14 days here)
        }).destroy(sid, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }
  },
});