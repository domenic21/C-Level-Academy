
// The code will be executed in the server
import mongoose, {Model} from "mongoose";
import {BookingTimes, WeekdayName, FromTo} from "@/libs/types";

const FromToSchema = new mongoose.Schema({ // Define the schema for the from-to field, a schema is a blueprint for the data
    from: String,
    to: String,
    active: Boolean, 
}
);

const BookingSchema = new mongoose.Schema<Record<WeekdayName, FromTo>>({
    Monday: FromToSchema,
    Tuesday: FromToSchema,
    Wednesday: FromToSchema,
    Thursday: FromToSchema,
    Friday: FromToSchema,
    Saturday: FromToSchema,
    Sunday: FromToSchema,
  });


  export interface IEventType extends mongoose.Document {
    email: string;
    uri: string;
    title: string;
    description: string;
    length: number;
    bookingTimes: BookingTimes;
    createdAt: Date;
    updatedAt: Date;
  }

const EventTypeSchema = new mongoose.Schema<IEventType>({ // Define the schema for the event type, a schema is a blueprint for the data
    email: String,
    uri: {type: String},
    title: String,
    description: String,
    length: Number,
    bookingTimes: BookingSchema,
    

},
{
    timestamps: true, // Add timestamps to the schema to track when the data was created and updated
}
);



//export default mongoose.models?.EventType   || mongoose.model('EventType', EventTypeSchema); // Export the model for the event type
export const EventTypeModel = mongoose.models?.EventType as Model<IEventType> || mongoose.model<IEventType>('EventType', EventTypeSchema);